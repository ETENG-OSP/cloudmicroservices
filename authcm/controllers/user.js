var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var config = require('../lib/config');
var appCollection = require('../lib/application');
var collections = require('../lib/collections');
var factory = require('../lib/create-resource-controller');

var controller = factory('user');

function login(credentials, appId) {

  return Promise.all([
    collections(appId).get('user'),
    appCollection.get()
  ]).spread(function(User, Application) {

    return Promise.all([
      User.login(credentials),
      Application.findOrCreate({id: appId})
    ]);

  }).spread(function(user, application) {

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

}

function signup(credentials, appId) {
  console.log(arguments);
  return collections(appId)
    .get('user')
    .then(function(User) {
      return User.signup(credentials);
    })
    .then(function(user) {
      return {
        userId: user.id
      };
    });
}

controller.login = login;
controller.signup = signup;

module.exports = controller;
