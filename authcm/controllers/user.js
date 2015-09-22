var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var appCollection = require('../utils/application');
var cmlib = require('cmlib');

var controller = cmlib.resourceController('user');

controller.operation('login', function(credentials) {
  var self = this;
  return Promise
    .all([
      this.realm(function(user) {return user;}),
      appCollection.get()
    ])
    .spread(function(User, Application) {
      return Promise.all([
        User.login(credentials),
        Application.findOrCreate({id: self.getCurrentApp()}),
        cmlib.configure()
      ]);
    })
    .spread(function(user, application, config) {
      var token = jwt.sign({}, application.secret, {
        noTimestamp: true,
        subject: user.id,
        issuer: config.id,
        audience: application.id
      });
      return {
        userId: user.id,
        token: token
      };
    });
});

controller.operation('signup', function(credentials) {
  return this
    .realm(function(user) {
      return user.signup(credentials);
    })
    .then(function(user) {
      return {
        userId: user.id
      };
    });
});

module.exports = controller;
