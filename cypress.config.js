const {defineConfig} = require("cypress");

module.exports = defineConfig({

  e2e: {
    chromeWebSecurity: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'http://localhost:3000/',
    watchForFileChanges: false,
    numTestsKeptInMemory: 50,
    specPattern: 'cypress/e2e/*.{js,jsx,ts,tsx}',
    retries: {
      runMode: 2,
      openMode: 2,
    },
    setupNodeEvents(on, config) {

    },
  },
});
