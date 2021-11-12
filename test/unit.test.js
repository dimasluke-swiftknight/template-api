/* eslint-disable no-undef */
const assert = require('assert');

const TestService = require('../api/services/test-service');

describe('Unit Test', () => {
  describe('Passing', () => {
    it('Template test should Pass', () => {
      assert.equal(1 + 1, 2);
    });
  });
});

describe('Test Service', () => {
  describe('Verify data spread', () => {
    it('Should merge the two objects', () => {
      const testService = new TestService({
        getTests() {
          return {
            test: 1,
          };
        },
      });
      const testv1Service = new TestService({
        getTests() {
          return {
            test1: 1,
          };
        },
      });

      const result = {
        ...testService.getTests(),
        ...testv1Service.getTests(),
      };
      assert(result, { test: 1, test1: 1 });
    });
  });
});
