var Promise = require('bluebird');
var jwt = require('jsonwebtoken');

function factory(secret) {
  var verify = Promise.promisify(jwt.verify);

  return function(req, definitions, apiKey, callback) {
    verify(apiKey, secret)
      .then(function(payload) {
        req.cm = {
          payload: payload,
          appId: payload.aud
        };
        callback();
      })
      .catch(callback);
  };
}

module.exports = factory;
