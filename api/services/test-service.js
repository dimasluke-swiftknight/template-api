class TestService {
  constructor(testModel) {
    this.testModel = testModel;
  }

  async getTests() {
    const results = await this.testModel.getTests();

    return results;
  }
}

module.exports = TestService;
