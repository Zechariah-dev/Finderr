const authRoute = require('./auth');
const businessRoute = require('./business');
const productRoute = require('./product');
const serviceRoute = require('./service');

module.exports = (app) => {
    app.use('/api/auth', authRoute);
    app.use('/api/business', businessRoute);
    app.use('/api/product', productRoute)
    app.use('/api/service', serviceRoute)
};
