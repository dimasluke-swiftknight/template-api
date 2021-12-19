/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb');

const { format, createLogger, transports } = winston;
const {
  combine, timestamp, prettyPrint,
} = format;

const MESSAGE = Symbol.for('message');

const envTag = (logEntry) => {
  const tag = {
    env: process.env.APPLICATION_ENV || 'local',
  };
  const taggedLog = Object.assign(tag, logEntry);
  // eslint-disable-next-line no-param-reassign
  logEntry[MESSAGE] = JSON.stringify(taggedLog);

  return logEntry;
};

const mongodbTransport = new winston.transports.MongoDB({
  db: process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017',
  collection: 'dev',
  level: 'info',
  options: {
    useUnifiedTopology: true,
  },
  capped: true,
  format: format.combine(format.timestamp(), format.json()),
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
    format(envTag)(),
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
