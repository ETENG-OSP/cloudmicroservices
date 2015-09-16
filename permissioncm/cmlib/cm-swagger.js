var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

function factory(config) {
  return {
    verify: verify
  };

  function verify(token) {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, config.secret, function(err, payload) {
        if (err) {
          return reject(err);
        }
        resolve(payload);
      });
    });
  }
}

module.exports = factory;
