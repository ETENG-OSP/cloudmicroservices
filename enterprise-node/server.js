var http = require('http');
var Promise = require('bluebird');

// var permissionServer = http.createServer(require('./lib/app-permission'));
// var demoServer = http.createServer(require('./lib/app-demo'));
var authServer = http.createServer(require('./lib/app-auth'));
var adminServer = http.createServer(require('./lib/app-admin'));
var storeServer = http.createServer(require('./lib/app-store'));

// permissionServer.listen(3001, function() {
//   console.log('> permission server started at 3001');
// });
//
// demoServer.listen(3000, function() {
//   console.log('> demo server started at 3000');
// });

function start() {
  return Promise.all([
    adminServerStart(),
    storeServerStart(),
    testServiceStart()
  ]);
}

function adminServerStart() {
  return new Promise(function(resolve, reject) {
    adminServer.listen(3003, function() {
      console.log('> admin server started at 3003');
      resolve();
    });
  });
}

function storeServerStart() {
  return new Promise(function(resolve, reject) {
    storeServer.listen(3004, function() {
      console.log('> store server started at 3004');
      resolve();
    });
  });
}

function authServerStart() {
  return new Promise(function(resolve, reject) {
    authServer.listen(3002, function() {
      console.log('> auth server started at 3002');
      resolve();
    });
  });
}

function testServiceStart() {
  return new Promise(function(resolve, reject) {
    var express = require('express');
    var app = express();
    var cmlib = require('./cmlib');
    var cm = cmlib({
      id: '2',
      secret: 'OTAwNWM0NDUtM2U3Ni00OGU3LWE5ZWMtNTVjZjY5MGYyN2Fj'
    });
    app.listen(3005, function() {
      console.log('> test server started at 3005');
      resolve();
    });
    app.use(express.static(__dirname + '/public/test'));
    app.use(cm.login());
    app.get(
      '/test',
      cm.verify,
      cm.issuerCheck,
      cm.audienceCheck,
      function(req, res) {
        res.send('应用' + req.appId + '调用了接口');
      }
    );

    app.get(
      '/test/admin',
      cm.verify,
      cm.issuerCheck,
      cm.audienceCheck,
      cm.adminCheck,
      function(req, res) {
        res.send('应用' + req.appId + '调用了管理员接口');
      }
    );
  });
}

exports.start = start;
