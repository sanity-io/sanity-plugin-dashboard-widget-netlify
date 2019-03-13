import { Observable } from 'rxjs'
import { createAbortController } from './utils/createAbortController'

export const statusCodeRequest = (input: RequestInfo, init?: RequestInit): Observable<number> => {
  return new Observable(subscriber => {
    const controller = createAbortController()
    const onResponse = (res: number) => {
      subscriber.next(res)
      subscriber.complete()
    }
    const onError = (err: Error) => {
      if (err.name === 'AbortError') {
        subscriber.complete()
      } else {
        subscriber.error(err)
      }
    }

    fetch(input, { ...init, signal: controller.signal })
      .then((res: Response) => {
        if (res.status < 200 || res.status > 299) {
          throw new Error(`HTTP Error ${res.status}: ${res.statusText}`)
        }
        return res.status
      })
      .then(onResponse, onError)

    return () => {
      controller.abort()
    }
  })
}
