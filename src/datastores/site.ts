import { Observable, of } from 'rxjs'
import { publishReplay, refCount, catchError, map } from 'rxjs/operators'
import { jsonRequest } from '../http/jsonRequest'
import { Site, SiteAPIData } from '../types'

const requestSite = (siteId: string) =>
  jsonRequest<SiteAPIData>(`https://api.netlify.com/api/v1/sites/${siteId}`, {
    method: 'GET'
  })

export const fetchSite = (siteId: string): Observable<Site> =>
  requestSite(siteId).pipe(
    catchError(error => of(error)),
    map((result: SiteAPIData | Error) => {
      if (result instanceof Error) {
        return { id: siteId, name: siteId, error: result }
      }
      return { id: siteId, name: result.name, data: result }
    }),
    publishReplay(1),
    refCount()
  )
