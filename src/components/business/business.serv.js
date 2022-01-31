const BusinessRepository = require('../../database/repositories/business.repo');

const BusinessService = {
  async createBusiness(payload) {
    return BusinessRepository.create(payload);
  }
};

module.exports = BusinessService;
