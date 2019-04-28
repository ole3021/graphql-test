'use strict';

/** Disable PersistedModel's default remote methods (endpoints).
 * @param {Object} model: The PresistedModel class
 * @param {string[]} allowedMethods: List of allowed remote method names, check: https://apidocs.strongloop.com/loopback/#persistedmodel
 */
exports.disableRemoteMethods = (model, allowedMethods = []) => {
  model.sharedClass.methods().forEach(method => {
    if (allowedMethods.indexOf(method.name) < 0) {
      if (method.isStatic) {
        model.disableRemoteMethodByName(method.name);
      } else {
        model.disableRemoteMethodByName('prototype.' + method.name);
      }
    }
  });
};
