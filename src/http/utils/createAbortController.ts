import AbortControllerPolyfill from 'abort-controller'

export const createAbortController = (): AbortController => {
  if (!('AbortController' in window)) {
    return new AbortControllerPolyfill()
  }
  return new AbortController()
}
