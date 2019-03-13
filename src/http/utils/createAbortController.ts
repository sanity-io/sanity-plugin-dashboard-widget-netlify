import AbortControllerPolyfill from 'abort-controller'

export const createAbortController = () => {
  if (!('AbortController' in window)) {
    return new AbortControllerPolyfill()
  }
  return new AbortController()
}
