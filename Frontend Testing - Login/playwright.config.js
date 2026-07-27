import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();


export default defineConfig({

  // Where Playwright looks for tests
  testDir: './tests',


  // Run tests one by one
  workers: 1,


  // Test report
  reporter: 'html',


  // Common settings for all tests
  use: {

    // Show browser during execution
    headless: false,

    // Collect debugging information if a test fails
    trace: 'on-first-retry',

  },


  // Browser to use
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});