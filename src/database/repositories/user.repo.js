const BaseRepository = require('../repository');
const User = require('../models/user.model');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }
}

module.exports = new UserRepository();