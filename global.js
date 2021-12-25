require('dotenv').config();

const configs = require('./api/config/index');

const { logger } = configs;

global.logger = logger;
global.environment = process.env.APPLICATION_ENV || 'local';
global.application = 'template-api';
