/* eslint-disable no-undef */
const mongoose = require('mongoose');

const { app } = require('./app');

let server;

const port = process.env.PORT || 3000;

const databaseUrl = process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017';

const connectDatabase = async (dbUrl) => {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (error) => {
    if (error) throw error;
    logger.info(`DB connected at ${dbUrl}`, {
      metadata: {
        application: applicationName,
      },
    });
  });

  mongoose.connection.on('disconnected', () => {
    logger.error(`DB disconnected at ${dbUrl}`, {
      metadata: {
        application: applicationName,
      },
    });
  });

  mongoose.connection.on('reconnected', () => {
    logger.info(`DB reconnected at ${dbUrl}`, {
      metadata: {
        application: applicationName,
      },
    });
  });
};

const runServer = async (dbUrl, portNum) => {
  await connectDatabase(dbUrl);
  try {
    server = app.listen(portNum, () => {
      logger.info(`Server is listening on port ${portNum}`, {
        metadata: {
          application: applicationName,
        },
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
      logger.info('Disconnected from MongoDB', {
        metadata: {
          application: applicationName,
        },
      });
    });
    server.close(() => {
      logger.info('Server closed', {
        metadata: {
          application: applicationName,
        },
      });
    });
  } catch (err) {
    logger.error(err, {
      metadata: {
        application: applicationName,
      },
    });
  }
};

if (require.main === module) {
  runServer(databaseUrl, port).catch((err) => {
    logger.error(err.message, {
      metadata: {
        application: applicationName,
      },
    });
  });
}

module.exports = { runServer, closeServer };
