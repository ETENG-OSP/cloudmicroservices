var Promise = require('bluebird');
var factory = require('../lib/create-resource-controller');
var _ = require('underscore');

var collections = require('../lib/collections');
var controller = factory('role', ['permissions', 'users']);

var update = controller.update;
controller.update = function(id, args, appId) {
  return collections(appId)
    .get('user')
    .then(function(User) {
      return Promise.all(_.map(args.users, function(userId) {
        return User.findOrCreate(userId);
      }));
    }).then(function() {
      return update(id, args, appId);
    });
};

module.exports = controller;
