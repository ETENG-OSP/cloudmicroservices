var express = require('express');
var Promise = require('bluebird');
var cmlib = require('cmlib');

cmlib.configure({
  id: '1',
  secret: 'ZDE4MGZmMTYtNTI5ZC00MmIwLTliZjctNTQzNjBhOTc2ZGFi',
  controllers: __dirname + '/controllers',
  models: __dirname + '/models',
  api: __dirname + '/api/swagger.json'
});

function start() {
  return cmlib
    .middleware()
    .then(function(middleware) {
      var deferred = Promise.defer();
      var app = require('express')();
      app.use(middleware);
      app.listen(3002, function() {
        console.log('> auth server started at 3002');
        deferred.resolve();
      });
      return deferred.promise;
    });
}

exports.start = start;
