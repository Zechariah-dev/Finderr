const ProductRepository = require('../../database/repositories/product.repo');

const ProductService = {
  createProduct(payload) {
    return ProductRepository.create(payload);
  },
  async fetchProduct(queries = {}) {
    function escapeRegex(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    try {
      const query = {};

      if(Object.prototype.hasOwnProperty.call(queries, 'categories')) {
        query.category = { $in: queries.categories}
      }
  
      if(Object.prototype.hasOwnProperty.call(queries, 'tags')) {
        query.tags = { $in: queries.tags}
      }

      if (Object.prototype.hasOwnProperty.call(queries, 'q')) {
        query.name = new RegExp(escapeRegex(queries.q), 'gi')
      }

      const products = await ProductRepository.filter(query);
      return products;
    } catch(err) {
      throw new Error(err);
    }
  }
};

module.exports = ProductService;
