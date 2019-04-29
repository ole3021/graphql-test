'use strict';

const { getApp } = require('../utils/lb-helper');
const app = getApp();

module.exports = {
  Mutation: {
    createReservation: (ojb, { data }, context) => {
      return app.models.Reservations.create(data);
    }
  },
  Query: {
    getReservation: (obj, args, context, info) => {
      return app.models.Reservations.findById(args.id);
    },

    reservations: () => app.models.Reservations.find()
  }
};
