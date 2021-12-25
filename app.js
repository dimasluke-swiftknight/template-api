/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const global = require('./global');

const swaggerDocument = YAML.load('./api/docs/template-api.yaml');

const { defaultExceptionHandler, requestMiddleware } = require('./api/config/index');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(requestMiddleware);

const { TestController } = require('./api/controllers/index');

app.use('/template/v1/api/tests', TestController);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(defaultExceptionHandler);

module.exports = { app };
