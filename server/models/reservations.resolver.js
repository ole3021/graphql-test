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
    getReservation: (obj, { id }, context, info) => {
      return app.models.Reservations.findById(id);
    },

    reservations: (obj, { query }, context, info) => {
      const { limit, skip } = query;
      return app.models.Reservations.find({ limit, skip });
    },

    totalReservations: (obj, args, context, info) => {
      return app.models.Reservations.count();
    }
  }
};
