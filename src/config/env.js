// import { env as qaEnv } from './env.qa';
// import { env as stagingEnv } from './env.staging.js';
// import { env as prodEnv } from './env.prod.js';

// const environment = process.env.TEST_ENV || 'qa';

// let env;
// if (environment === 'qa') env = qaEnv;
// else if (environment === 'staging') env = stagingEnv;
// else if (environment === 'prod') env = prodEnv;

// module.exports = env;

const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, `env.${process.env.TEST_ENV || 'qa'}`)
});

export const env = {
  baseURL: process.env.BASE_URL,
  username: process.env.APP_USERNAME,
  password: process.env.APP_PASSWORD
};