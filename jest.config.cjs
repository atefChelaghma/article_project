/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  // Include separate test directory plus source for coverage path resolution
  roots: ['<rootDir>/test', '<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json', isolatedModules: true }],
  },
  moduleNameMapper: {
    // CSS modules or plain styles -> identity-obj-proxy or stub
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Static assets -> stub
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
  // Use explicit pattern for unit spec files: *.unit.spec.ts / *.unit.spec.tsx
  testMatch: ['**/*.unit.spec.ts', '**/*.unit.spec.tsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {},
}
