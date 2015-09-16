var Promise = require('bluebird');
var resourceController = require('../lib/resource-controller');
var _ = require('underscore');

var collections = require('../lib/collections');
var controller = resourceController('role', ['permissions', 'users']);

var update = controller.update;
controller.update = function(req, res, next) {

  var appId = req.cm.appId;

  return collections(appId)
    .get('user')
    .then(function(User) {
      return Promise.all(_.map(args.users, function(userId) {
        return User.findOrCreate(userId);
      }));
    })
    .then(function() {
      return update(req, res, next);
    });
};

module.exports = controller;
