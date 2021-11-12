/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../app');

describe('Integration Test', () => {
  describe('GET /', () => {
    it('Call template Router data - Passing', () => request(app)
      .get('/tests')
      .expect(200));
  });

  describe('GET /tests', () => {
    it('Call GET /tests to return aggregated results of two models - Passing', () => {
      request(app)
        .get('/tests')
        .set('x-knight-correlation-id', 'Test-Id')
        .expect(200)
        .then((response) => {
          assert(response.body, {
            hello: 'world',
            world: 'hello',
          });
        });
    });
  });
});
