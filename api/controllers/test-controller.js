/* eslint-disable no-undef */
const controller = require('express').Router();

const { TestService } = require('../services/index');

const { TestModel, TestModelV1 } = require('../models/index');

controller
  .get('/', async (req, res) => {
    logger.info({
      application: applicationName,
      message: 'start-get-tests',
      correlationId: req.headers['x-correlation-id'],
    });

    const testService = new TestService(TestModel);
    const testV1Service = new TestService(TestModelV1);

    const result = {
      ...await testService.getTests(),
      ...await testV1Service.getTests(),
    };

    logger.info({
      application: applicationName,
      message: 'end-get-tests',
      correlationId: req.headers['x-correlation-id'],
    });

    return res.status(200).send(result);
  });

module.exports = controller;
