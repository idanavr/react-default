const express = require('express');
const app = express();
const config = require('./settings/config');
global.config = config;
require('./models/db/utils').initModels();
const middlewares = require('./settings/middlewares');
const setRouting = require('./settings/routing');
const logger = new (require('./logger'))('server');

require('./settings/db-connection')
  .connect()
  .catch((error) => {
    logger.error(error);
  });

middlewares.setMiddlewaresBeforeRouting(app);
setRouting(app, config.env);
middlewares.setMiddlewaresAfterRouting(app, config.env);

if (!module.parent) {
  const port = process.env.PORT || config.port;
  app.listen(port, (error) => {
    if (error)
      logger.error(error);
    else
      logger.info(`Listening on port ${port}`);
  });
}

module.exports = app;