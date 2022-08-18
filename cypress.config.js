const {defineConfig} = require("cypress");

module.exports = defineConfig({

  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    chromeWebSecurity: false,
    baseUrl: 'http://localhost:3000',
    watchForFileChanges: false,
    numTestsKeptInMemory: 50,
    specPattern: 'cypress/e2e/*.{js,jsx,ts,tsx}',
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {

    },
  },
});
