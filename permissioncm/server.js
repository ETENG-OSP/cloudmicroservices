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
    server.listen(3001, function() {
      console.log('> permission server started at 3001');
      resolve();
    });
  });
}

exports.start = start;
