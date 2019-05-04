'use strict';

module.exports = {
  mongoUserName: process.env.MONGO_USERNAME || 'root',
  mongoUserPassword: process.env.MONGO_PASSWORD || 'Passw0r!d',
  mongoDataBase: process.env.MONGO_DATABASE || 'graphql_server_test',

  graphPath: process.env.GRAPH_PATH || '/graphql'
};
