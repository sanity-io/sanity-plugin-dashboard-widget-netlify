import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {statusCodeRequest} from '../http/statusCodeRequest'
import {Site} from '../types'

export function deploy(site: Site): Observable<{result: number; site: Site} | Error> {
  if (!site.buildHookId) {
    return of(new Error('Site missing buildHookId'))
  }

  return statusCodeRequest(`https://api.netlify.com/build_hooks/${site.buildHookId}`, {
    method: 'POST',
  }).pipe(map((result) => ({result, site})))
}
