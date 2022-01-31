const BaseRepository = require('../repository');
const Business = require('../models/business.model');

class BusinessRepository extends BaseRepository {
    constructor() {
        super(Business);
    }
}

module.exports = new BusinessRepository();
