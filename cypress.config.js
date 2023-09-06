const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  env: {
    base_url: process.env.BASE_URL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: process.env.BASE_URL
  },
});
