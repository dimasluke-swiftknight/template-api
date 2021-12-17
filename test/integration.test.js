/* eslint-disable no-undef */
const { assert } = require('joi');
const request = require('supertest');
const { app } = require('../app');

const configs = require('./config/config');

const { params } = configs;


describe('Integration Test', () => {
  const agent = request(app);

  describe('GET /tests', () => {
    it('Call GET /tests to return aggregated results of two models - Passing', async () => {
      const requestString = params.basePath + '/tests';

      await agent.get(requestString).set(params.headers)
        .expect(200)
        .then((response) => {
          const { body } = response;

          assert.equal(body.hello, 'world');
          assert.equal(body.world, 'hello');
        });
    });
  });
});
