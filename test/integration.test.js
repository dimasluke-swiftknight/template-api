/* eslint-disable no-undef */
const { uuid } = require('uuidv4');
const assert = require('assert');
const request = require('supertest');
const { app } = require('../app');

describe('Integration Test', () => {
  const agent = request(app);

  describe('GET /tests', () => {
    it('Call GET /tests to return aggregated results of two models - Passing', async () => {
      const headers = { 'x-correlation-id': uuid() };

      await agent.get('/template/v1/api/tests').set(headers)
        .expect(200)
        .then((response) => {
          const { body } = response;

          assert.equal(body.hello, 'world');
          assert.equal(body.world, 'hello');
        });
    });
  });
});
