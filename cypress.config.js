const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // reporter: 'mochawesome',
  // reporter: "cypress-multi-reporters",
  // reporterOptions: {
  //   configFile: "reporter-config.json",
  // },
  reporter: 'mochawesome',
  reporterOptions: {
    // reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {},
})
