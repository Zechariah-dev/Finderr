const BaseRepository = require('../repository');
const Product = require('../models/product.model');

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }
}

module.exports = new ProductRepository();
