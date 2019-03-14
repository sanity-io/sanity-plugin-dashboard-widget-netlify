import { from, merge, of } from 'rxjs'
import { createEventHandler } from 'react-props-stream'
import { catchError, map, startWith, switchMap, mergeMap, toArray } from 'rxjs/operators'
import { fetchSite } from './datastores/site'
import { deploy } from './datastores/deploy'
import { Site, WidgetOptions } from './types'
import { stateReducer$ } from './reducers'

const noop = () => void 0

const INITIAL_PROPS = {
  title: 'Netlify deployments',
  sites: [],
  isLoading: true,
  onDeploy: noop
}

export const props$ = (options: WidgetOptions) => {
  const oSites = options.sites || []
  const sites$ = from(oSites.map(site => site.siteId)).pipe(
    mergeMap(fetchSite),
    toArray()
  )
  const [onDeploy$, onDeploy] = createEventHandler<Site>()
  const setSitesAction$ = sites$.pipe(map(sites => ({ type: 'setSites', sites })))
  const deployAction$ = onDeploy$.pipe(map(site => ({ type: 'deploy/started', site })))
  const deployResult$ = onDeploy$.pipe(switchMap(site => deploy(site)))
  const deployCompletedAction$ = deployResult$.pipe(
    map(
      result => ({ type: 'deploy/completed', ...result }),
      catchError(error => of({ type: 'deploy/failed', error }))
    )
  )

  merge(setSitesAction$, deployAction$, deployCompletedAction$)
    .pipe(stateReducer$)
    .subscribe()

  return sites$.pipe(
    map(sites => {
      const finalSites = sites
        .map(site => {
          const siteOptions = oSites.find(oSite => oSite.siteId === site.id)
          // Prefer name from options if present
          if (siteOptions && siteOptions.name) {
            site.name = siteOptions.name
          }
          // Set deployHookId from options if present
          if (siteOptions && siteOptions.deployHookId) {
            site.deployHookId = siteOptions.deployHookId
          }
          return site
        })
        .filter(Boolean)
      return {
        sites: finalSites,
        title: options.title || INITIAL_PROPS.title,
        isLoading: false,
        onDeploy
      }
    }),
    startWith(INITIAL_PROPS)
  )
}
