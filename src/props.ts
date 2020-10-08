import { merge, of } from 'rxjs'
import { createEventHandler } from 'react-props-stream'
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { deploy } from './datastores/deploy'
import { Site, WidgetOptions } from './types'
import { stateReducer$ } from './reducers'

const noop = () => void 0

const INITIAL_PROPS = {
  title: 'Netlify sites',
  sites: [],
  isLoading: true,
  onDeploy: noop
}

export const props$ = (options: WidgetOptions) => {
  const sites = (options.sites || []).map(site => ({
    id: site.apiId,
    name: site.name,
    title: site.title,
    buildHookId: site.buildHookId,
    url: site.url || (site.name && `https://${site.name}.netlify.app/`),
    adminUrl: site.name && `https://app.netlify.com/sites/${site.name}`
  }))

  const [onDeploy$, onDeploy] = createEventHandler<Site>()
  const setSitesAction$ = of(sites).pipe(map(sites => ({ type: 'setSites', sites })))
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

  return of(sites).pipe(
    map(sites => {
      return {
        sites,
        title: options.title || INITIAL_PROPS.title,
        description: options.description,
        isLoading: false,
        onDeploy
      }
    }),
    startWith(INITIAL_PROPS)
  )
}
