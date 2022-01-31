const mongoose = require('mongoose');

const Database = {
    async connect() {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            global.logger.info('Finderr Server -> Database Connected');
        } catch (err) {
            global.logger.error('Finderr Server -> Error connecting to Database');
            global.logger.error(err.message);
            throw err;
        }
    }
}

module.exports = Database;