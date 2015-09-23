var Promise = require('bluebird');
var express = require('express');
var nconf = require('nconf');

var middleware = require('./middleware');

function startup(opts) {

  var port = opts.application.port;

  return middleware(opts)
    .then(function(middlewares) {
      var deferred = Promise.defer();
      var app = express();
      app.use(middlewares);
      app.listen(port, function() {
        deferred.resolve();
      });
      return deferred.promise;
    });
}

module.exports = startup;
