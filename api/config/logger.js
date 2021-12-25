/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb');

require('../../global');

const { format, createLogger, transports } = winston;
const {
  combine, timestamp, json, prettyPrint,
} = format;

const customFormat = format((logEntry) => ({
  ...logEntry,
  metadata: {
    ...logEntry.metadata,
    ...{ application, environment },
  },
}));

const mongodbTransport = new winston.transports.MongoDB({
  db: process.env.MONGODB_CONNECTION_STRING_LOGS || 'mongodb://127.0.0.1:27017',
  collection: 'dev-logs',
  level: 'info',
  options: {
    useUnifiedTopology: true,
  },
  capped: true,
});

const fileTransport = new transports.DailyRotateFile({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logConfiguration = {
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    customFormat(),
    json(),
    prettyPrint(),
  ),
  transports: [
    fileTransport,
    mongodbTransport,
  ],
};

const logger = createLogger(logConfiguration);

if (process.env.APPLICATION_ENV !== 'production') {
  logger.add(new transports.Console({ level: 'debug' }));
}

module.exports = logger;
