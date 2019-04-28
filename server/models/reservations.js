'use strict';

const { disableRemoteMethods } = require('../utils/lb-helper');

module.exports = Reservations => {
  disableRemoteMethods(Reservations, ['create', 'find', 'findById']);
};
