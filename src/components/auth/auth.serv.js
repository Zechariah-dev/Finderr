const UserRepository = require('../../database/repositories/user.repo');

const AuthService = {
  async createUser(payload) {
    return UserRepository.create(payload);
  }
};

module.exports = AuthService;
