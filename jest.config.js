/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json', // Arquivo específico para testes
      }
    ],
  },
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
    '^@/(.*)$': '<rootDir>/src/$1', // Ajuste para seus aliases
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)', // Ignora node_modules, exceto .mjs
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};