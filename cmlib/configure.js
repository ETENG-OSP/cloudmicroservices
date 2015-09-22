var Promise = require('bluebird');

var config = Promise.defer();

function configure(opts) {
  if (opts) {
    config.resolve(opts);
  }
  return config.promise;
}

module.exports = configure;
