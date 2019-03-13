import { scan } from 'rxjs/operators'
import { Site } from './types'

interface Deployment {
  id: string
}

interface Action {
  type: string
  sites?: Site[]
  site?: Site
  error?: Error
  deployments?: Deployment[]
}

interface State {
  sites: Site[]
  action: Action
}

export const stateReducer$ = scan((state: State, action: Action) => {
  switch (action.type) {
    case 'setSites':
      return { ...state, sites: action.sites || [] }
    case 'deploy/started':
      return {
        ...state,
        sites: state.sites.map((site: Site) => {
          if (action.site && site.id === action.site.id) {
            return { ...site, isDeploying: true }
          }
          return site
        })
      }
    case 'deploy/failed':
      return {
        ...state,
        error: action.error
      }
    case 'deploy/completed':
      return {
        ...state,
        sites: state.sites.map((site: Site) => {
          if (action.site && site.id === action.site.id) {
            return { ...site, isDeploying: false, error: action.error }
          }
          return site
        })
      }
    default:
      return state
  }
})
