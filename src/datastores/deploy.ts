import { of } from 'rxjs'
import { map } from 'rxjs/operators'
import { statusCodeRequest } from '../http/statusCodeRequest'
import { jsonRequest } from '../http/jsonRequest'
import { Site } from '../types'

interface Deployment {
  id: string
}

export function deploy(site: Site) {
  if (!site.deployHookId) {
    return of(new Error('Site missing deployHookId'))
  }
  return statusCodeRequest(`https://api.netlify.com/build_hooks/${site.deployHookId}`, {
    method: 'POST'
  }).pipe(map(result => ({ result, site })))
}

export function getDeploys(site: Site) {
  return jsonRequest<Deployment[]>(`https://api.netlify.com/api/v1/sites/${site.id}/deploys`, {
    method: 'GET'
  }).pipe(map(deployments => ({ deployments, site })))
}
