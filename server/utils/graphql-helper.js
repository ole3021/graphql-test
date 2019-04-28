'use strict';
const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers
} = require('merge-graphql-schemas');

exports.loadTypes = () => {
  const typeDefs = fileLoader(path.join(__dirname, '../**/*.graphql'));
  return mergeTypes(typeDefs);
};

exports.loadResolvers = () => {
  const resolveDefs = fileLoader(path.join(__dirname, '../**/*.resolver.js'));
  return mergeResolvers(resolveDefs);
};
