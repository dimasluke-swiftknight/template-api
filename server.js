/* eslint-disable no-undef */
const { app } = require('./app');

const mongoose = require('mongoose');

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
    runServer(databaseUrl, port).catch((err) => {
        logger.error({
            application: applicationName,
            message: err.message,
        })
    });
}

module.exports = { runServer, closeServer };
