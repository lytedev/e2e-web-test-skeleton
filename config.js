process.env.rootTestUrl = "https://www.emfluence.com";

process.env.environmentType = "production";

process.env.watchTaskFiles = [
  // Any e2e test files
  "./tests/e2e/**/*.js"
];

process.env.defaultBrowser = "phantomjs";
process.env.baseDriverTimeout = 30000;

