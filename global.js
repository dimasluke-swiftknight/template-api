const configs = require('./api/config/index');

const { logger } = configs;

global.logger = logger;
global.applicationName = 'template-api';
