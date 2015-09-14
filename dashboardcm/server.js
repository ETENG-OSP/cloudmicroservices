var http = require('http');
var Promise = require('bluebird');
var server = http.createServer(require('./lib/app'));

function start() {
  return Promise.all([
    serverStart()
  ]);
}

function serverStart() {
  return new Promise(function(resolve, reject) {
    server.listen(3006, function() {
      console.log('> management server started at 3006');
      resolve();
    });
  });
}

exports.start = start;
