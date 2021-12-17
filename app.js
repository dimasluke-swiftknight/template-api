/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const global = require('./global');

const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = YAML.load('./template-api.yaml');

require('dotenv').config();

const app = express();

app.use(express.json());

const { TestController } = require('./api/controllers/index');

app.use('/template/api/v1/tests', TestController);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { defaultExceptionHandler } = require('./api/config/index');

app.use(defaultExceptionHandler);

module.exports = { app };
