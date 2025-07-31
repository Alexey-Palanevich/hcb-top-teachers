/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  moduleNameMapper: {
    '0-business-rules/(.*)$': '<rootDir>/0-business-rules/$1',
    '1-application-rules/(.*)$': '<rootDir>/1-application-rules/$1',
    '2-adapters/(.*)$': '<rootDir>/2-adapters/$1',
    '3-drivers/(.*)$': '<rootDir>/3-drivers/$1',
  },
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
