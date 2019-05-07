import { of } from 'rxjs'
import { map } from 'rxjs/operators'
import { statusCodeRequest } from '../http/statusCodeRequest'
import { jsonRequest } from '../http/jsonRequest'
import { Site } from '../types'

interface Deployment {
  id: string
}

export function deploy(site: Site) {
  if (!site.buildHookId) {
    return of(new Error('Site missing buildHookId'))
  }
  return statusCodeRequest(`https://api.netlify.com/build_hooks/${site.buildHookId}`, {
    method: 'POST'
  }).pipe(map(result => ({ result, site })))
}
