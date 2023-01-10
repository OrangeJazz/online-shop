module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  verbose: true,
  rootDir: "../src",
  roots: [
    "<rootDir>/__tests__"
  ]
}