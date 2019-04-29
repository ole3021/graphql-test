const { ApolloServer } = require('apollo-server-express');
const { loadTypes, loadResolvers } = require('../utils/graphql-helper');

module.exports = app => {
  const server = new ApolloServer({
    typeDefs: loadTypes(),
    resolvers: loadResolvers()
  });
  server.applyMiddleware({ app, path: app.get('graphPath') });

  app.on('started', () => {
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log(
      `>>> Check GraphQL Endpoints at: ${baseUrl + app.get('graphPath')}`
    );
  });
};
