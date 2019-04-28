'use strict';

const { getApp } = require('../utils/lb-helper');
const app = getApp();

module.exports = {
  // TODO: Mutation
  Query: {
    getReservation: (parent, args, context, info) => {
      return app.models.Reservations.findById(args.id);
    },

    reservations: () => app.models.Reservations.find()
  }
};
