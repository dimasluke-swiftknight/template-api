require('dotenv').config();

global.environment = process.env.APPLICATION_ENV || 'local';
global.application = 'replace_me';
