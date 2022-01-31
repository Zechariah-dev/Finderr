const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const docs = require('./docs')

const Database = require('./database');
const routes = require('./routes');

const App = {
    async boot() {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(compression());
        app.use(morgan('tiny'));
        app.use(cors());
        app.use(helmet());

        await Database.connect();

        routes(app);
        docs(app);

        return app;
    }
}

module.exports = App