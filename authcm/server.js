var http = require('http');
var Promise = require('bluebird');
var authServer = http.createServer(require('./lib/app'));

function start() {
  return Promise.all([
    authServerStart()
  ]);
}

function authServerStart() {
  return new Promise(function(resolve, reject) {
    authServer.listen(3002, function() {
      console.log('> auth server started at 3002');
      resolve();
    });
  });
}

exports.start = start;
