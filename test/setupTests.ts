// @ts-expect-error workaround for nanoid
window.crypto = {
  getRandomValues(buffer) {
    // eslint-disable-next-line no-sync
    return require('crypto').randomFillSync(buffer)
  },
}

export {}
