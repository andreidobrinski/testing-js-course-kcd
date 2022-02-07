module.exports = {
  ...require('./jest-common'),
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  // imports additional expect assertions such as .toHaveTextContent
  // will provide for better error messages
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['@emotion/jest/serializer'],
}
