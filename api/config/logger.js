const winston = require('winston');

const { format, createLogger, transports } = winston;
const { combine, timestamp } = format;

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

const logConfiguration = {
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    format(envTag)(),
  ),
  transports: [
    new transports.File({ filename: './logs/output.log' }),
  ],
};

const logger = createLogger(logConfiguration);

if (process.env.APPLICATION_ENV !== 'production') {
  logger.add(new transports.Console());
}

module.exports = logger;
