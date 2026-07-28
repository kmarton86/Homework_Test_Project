import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  testDir: '.',

  workers: 1,

  reporter: 'html',

  use: {
    headless: false,
    trace: 'on-first-retry',
  },


  projects: [

    // Frontend UI Tests
    {
      name: 'frontend',
      testDir: './Frontend Testing/tests',
      use: {
        ...devices['Desktop Chrome'],
      },
    },


    // API Tests
    {
      name: 'api',
      testDir: './API Testing/tests',
    },


  ],

});