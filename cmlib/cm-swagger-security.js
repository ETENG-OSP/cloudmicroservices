var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var verify = Promise.promisify(jwt.verify);

function factory(opts) {
  return {
    cmApiKey: cmApiKey
  };

  function cmApiKey(req, definitions, apiKey, callback) {
    verify(apiKey, opts.secret)
      .then(function(payload) {
        req.cm = {
          payload: payload,
          appId: payload.aud
        };
        callback();
      })
      .catch(callback);
  }
}

module.exports = factory;
