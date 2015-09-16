var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var config = require('../lib/config');
var appCollection = require('../lib/application');
var collections = require('../lib/collections');
var resourceController = require('../lib/resource-controller');

var controller = resourceController('user');

function login(req, res, next) {

  var credentials = req.swagger.params.credentials.value;
  var appId = req.cm.appId;

  return Promise
    .all([
      collections(appId).get('user'),
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

      return res.json({
        userId: user.id,
        token: token
      });
    })
    .catch(next);
}

function signup(req, res, next) {

  var credentials = req.swagger.params.credentials.value;
  var appId = req.cm.appId;

  return collections(appId)
    .get('user')
    .then(function(User) {
      return User.signup(credentials);
    })
    .then(function(user) {
      return res.json({
        userId: user.id
      });
    })
    .catch(next);
}

controller.login = login;
controller.signup = signup;

module.exports = controller;
