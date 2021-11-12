/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../app');

describe('Integration Test', () => {
  describe('GET /', () => {
    it('Call template Router data - Passing', () => request(app)
      .get('/tests')
      .expect(200));
  });
});
