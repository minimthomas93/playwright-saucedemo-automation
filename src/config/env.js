import { env as qaEnv } from './env.qa.js';
import { env as stagingEnv } from './env.staging.js';
import { env as prodEnv } from './env.prod.js';

const environment = process.env.TEST_ENV || 'qa';

let env;
if (environment === 'qa') env = qaEnv;
else if (environment === 'staging') env = stagingEnv;
else if (environment === 'prod') env = prodEnv;

export default env;