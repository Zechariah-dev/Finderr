const ServiceRepository = require('../../database/repositories/service.repo');

const ServiceService = {
    createService(payload) {
        return ServiceRepository.create(payload);
    },
    async fetchService(queries = {}) {
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
      
            const services = await ServiceRepository.filter(query);
            return services;
        } catch(err) {
            throw new Error(err);
          }
    }
}

module.exports = ServiceService;