const BaseRepository = require('../repository');
const Service = require('../models/service.model');

class ServiceRepository extends BaseRepository {
    constructor() {
        super(Service);
    }
}

module.exports = new ServiceRepository();