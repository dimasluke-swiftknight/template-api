/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const logger = require('./api/config/logger');

const swaggerDocument = YAML.load('./template-api.yaml');

require('dotenv').config();

// eslint-disable-next-line no-unused-vars
const global = require('./global');

const app = express();

app.use(express.json());

const controllers = require('./api/controllers/index');

app.use('/', controllers.TestController);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let server;

const port = process.env.PORT || 3000;

const databaseUrl = 'mongodb://127.0.0.1:27017';

const connectDatabase = async (dbUrl) => {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (error) => {
    if (error) throw error;
    logger.info({
      application: applicationName,
      message: `DB connected at ${dbUrl}`,
    });
  });

  mongoose.connection.on('disconnected', () => {
    logger.error({
      application: applicationName,
      message: `DB disconnected at ${dbUrl}`,
    });
  });

  mongoose.connection.on('reconnected', () => {
    logger.info({
      application: applicationName,
      message: `DB reconnected at ${dbUrl}`,
    });
  });
};

const runServer = async (dbUrl, portNum) => {
  await connectDatabase(dbUrl);
  try {
    server = app.listen(portNum, () => {
      logger.info({
        application: applicationName,
        message: `Server is listening on port ${portNum}`,
      });
    });
  } catch (error) {
    mongoose.disconnect();
    throw error;
  }
};

const closeServer = async () => {
  try {
    mongoose.disconnect(() => {
      logger.info({
        application: applicationName,
        message: 'Disconnected from MongoDB',
      });
    });
    server.close(() => {
      logger.info({
        application: applicationName,
        message: 'Server closed',
      });
    });
  } catch (err) {
    logger.error({
      application: applicationName,
      message: err,
    });
  }
};

if (require.main === module) {
  runServer(databaseUrl, port).catch((err) => logger.error({
    application: applicationName,
    message: err,
  }));
}

module.exports = { app, runServer, closeServer };
