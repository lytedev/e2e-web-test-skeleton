// These values are .toString()'d and dropped into the process.env object by the
// gulpfile! Please don't overwrite anything important and don't expect objects
// to be added as objects.
// https://nodejs.org/api/process.html#process_process_env

module.exports = {
  rootTestUrl: "https://www.emfluence.com",
  environmentType: "production", // Also used to define the default test suite
  defaultBrowser: "phantomjs",
  baseDriverTimeout: 30000,
  testPrefix: "e2e-test-", 
  testSuites: {
    "dev": "dev.suite",
    "development": "dev.suite",
    "prod": "production.suite",
    "production": "production.suite",
  }
};

