var Promise = require('bluebird');
var configure = require('./configure');
var verify = Promise.promisify(require('jsonwebtoken').verify);

function cmApiKey(req, definitions, apiKey, callback) {
  return configure()
    .then(function(appConfig) {
      return verify(apiKey, appConfig.secret);
    })
    .then(function(payload) {
      req.cm = {
        payload: payload,
        appId: payload.aud
      };
      callback();
    })
    .catch(callback);
}

module.exports = cmApiKey;
