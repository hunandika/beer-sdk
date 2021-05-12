const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config',
    'coverage',
    'rollup.config.js',
    'dist',
    'src/index.local*',
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/.eslintrc.*', '!**/jest.*', '!**/vendor/**'],
  moduleNameMapper: {
    '@src': '<rootDir>/src',
    '@config': '<rootDir>/src/config',
    '@logger': '<rootDir>/src/logger/logger',
    '@cache': '<rootDir>/src/cache/cacheManager',
    '@mongPlug': '<rootDir>/src/mongoose_plugin',
    '@pJson': '<rootDir>/package.json',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
};
