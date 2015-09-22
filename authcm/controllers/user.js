var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var appCollection = require('../utils/application');
var cmlib = require('cmlib');

var controller = cmlib.resourceController('user');

controller.operation('login', function(credentials) {
  return Promise
    .all([
      this.realm(function(User) {return User;}),
      appCollection.get()
    ])
    .spread(function(User, Application) {
      return Promise.all([
        User.login(credentials),
        Application.findOrCreate({id: appId})
      ]);
    })
    .spread(function(user, application) {
      var token = jwt.sign({}, application.secret, {
        noTimestamp: true,
        subject: user.id,
        issuer: config.id,
        audience: appId
      });
      return {
        userId: user.id,
        token: token
      };
    });
});

controller.operation('signup', function(credentials) {
  return this
    .realm(function(User) {
      User.signup(credentials);
    })
    .then(function(user) {
      return {
        userId: user.id
      };
    });
});

module.exports = controller;
