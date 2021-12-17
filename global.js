const configs = require('./api/config/index');

const { logger } = require('./api/config/index');

global.logger = logger;
global.applicationName = 'template-api';
