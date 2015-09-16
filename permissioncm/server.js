var http = require('http');
var Promise = require('bluebird');
var appFactory = require('./lib/app');

function start() {
  return appFactory()
    .then(function(app) {
      return serverStart(app);
    });
}

function serverStart(app) {
  return new Promise(function(resolve, reject) {
    var server = http.createServer(app);
    server.listen(3001, function() {
      console.log('> permission server started at 3001');
      resolve();
    });
  });
}

exports.start = start;
