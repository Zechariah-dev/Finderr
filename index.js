const http = require('http');
const App = require('./src/app');
const pino = require('./src/utils/logger');
require('dotenv').config();

const Server = {
  async start() {
    const app = await App.boot();
    const server = http.createServer(app);
    const port = process.env.PORT || 3000;

    return server.listen(port);
  },
};

global.logger = pino;

Server.start()
  .then(() => global.logger.info(`Finderr -> Server up and running`))
  .catch((err) => global.logger.error(err));

module.exports = Server;
