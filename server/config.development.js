'use strict';

module.exports = {
  mongoUserName: process.env.MONGO_USERNAME || 'root',
  mongoUserPassword: process.env.MONGO_PASSWORD || 'Passw0r!d',

  graphPath: process.env.GRAPH_PATH || '/graphql'
};
