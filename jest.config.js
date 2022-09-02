module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  testPathIgnorePatterns: ['.yalc', 'node_modules', '.idea', 'lib', '.parcel-cache'],
  collectCoverageFrom: ['src/*.{js,ts}'],
  transformIgnorePatterns: ['node_modules/(?!(nanoid|uuid|get-random-values-esm))'],
  moduleDirectories: ['node_modules', 'node_modules/sanity/node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(mjs|js|jsx)$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
}
