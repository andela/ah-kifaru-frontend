module.exports = {
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!jest.config.js',
    '!**/dist/**',
    '!**/webpack-build-utils/**',
    '!README.md',
    'Procfile',
    'Postcss.config.js',
    '!package.json',
    '!package-lock.json',
    '!cypress.json',
    '!<rootDir>/server.js',
    '!webpack.common.js',
    '!webpack.config.js',
    '!**/coverage/**',
    '!**/tests/**'
  ]
};
