/* eslint-disable no-undef */
const Controller = require('express').Router();

const Services = require('../services/index');

const { TestService } = Services;

const Test = require('../models/test');
const TestV1 = require('../models/test-v1');

Controller
  .get('/tests', async (req, res) => {
    logger.info({
      application: applicationName,
      message: 'start-get-tests',
      correlationId: req.headers['x-knight-correlation-id'],
    });

    const testService = new TestService(Test);
    const testV1Service = new TestService(TestV1);

    const result = {
      ...await testService.getTests(),
      ...await testV1Service.getTests(),
    };

    logger.info({
      application: applicationName,
      message: 'end-get-tests',
      correlationId: req.headers['x-knight-correlation-id'],
    });

    res.status(200).send(result);
  });

module.exports = Controller;
