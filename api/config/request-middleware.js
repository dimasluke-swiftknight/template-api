/* eslint-disable func-names */
const joi = require('joi');

const requestMiddleware = async function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    '*',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Authorization,Pragma,Cache-Control,x-correlation-id',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE',
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  const correlationId = req.headers['x-correlation-id'];

  if ((joi.string().guid().required().validate(correlationId)).error) {
    return res.status(400).send({
      status: 'Error',
      message: 'Request header "x-correlation-id" is required.',
    });
  }

  return next();
};

module.exports = requestMiddleware;
