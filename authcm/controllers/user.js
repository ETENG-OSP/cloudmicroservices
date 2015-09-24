var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var cmlib = require('cmlib');
var nconf = require('nconf');

var appCollection = require('../utils/application');

var config = nconf.get();

var controller = cmlib.resourceController('user', null, config);

controller.operation('login', function(credentials) {
  var self = this;

  var secret = config.platform.secret;
  var featureId = config.platform.id;

  return Promise
    .all([
      this.realm(function(user) {return user;}),
      appCollection.get()
    ])
    .spread(function(User, Application) {
      return Promise.all([
        User.login(credentials),
        Application.findOrCreate({id: self.getCurrentApp()})
      ]);
    })
    .spread(function(user, application) {
      var token = jwt.sign({}, secret, {
        noTimestamp: true,
        subject: user.id,
        issuer: featureId,
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

controller.operation('verify', function(accessToken) {
  var self = this;
  return cmlib
    .configure()
    .then(function(config) {
      var payload = jwt.verify(accessToken, config.secret, {
        issuer: config.id,
        audience: self.getCurrentApp()
      });

      return self.realm(function(user) {
        return user.update(payload.sub, {
          active: true
        });
      });
    });
});

controller.operation('install', function() {
  var payload = this.req.cm.payload;
  console.log(payload);
  return appCollection
    .get()
    .then(function(Application) {
      return Application.findOrCreate({
        id: payload.aud,
        secret: payload.secret
      });
    })
    .then(function() {
      console.log(arguments)
    })
    .catch(function(err) {
      console.log('err:',err);
    });
});

module.exports = controller;
