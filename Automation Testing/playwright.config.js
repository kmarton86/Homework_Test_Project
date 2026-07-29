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

    // Frontend - Login Tests - Chrome
    {
      name: 'frontend-chrome',
      testDir: './Frontend Testing/tests',
      use: {
        ...devices['Desktop Chrome'],
      },
    },


    // Frontend - Login Tests - Edge
    {
      name: 'frontend-edge',
      testDir: './Frontend Testing/tests',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },


    // API Tests
    {
      name: 'api',
      testDir: './API Testing/tests',
    },


  ],

});