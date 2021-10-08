const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)
module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  collectCoverageFrom: ['src/*.{js,ts}'],
  moduleNameMapper: {
    ...moduleNameMapper,
  }
}
