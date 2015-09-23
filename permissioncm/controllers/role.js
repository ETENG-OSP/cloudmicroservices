var Promise = require('bluebird');
var cmlib = require('cmlib');
var _ = require('underscore');
var nconf = require('nconf');

var config = nconf.get();

var controller = cmlib.resourceController('role', ['permissions', 'users'], config);

controller.operation('update', function(id, data) {
  return this
    .realm(function(user, role) {
      return Promise.all(_.map(data.users, function(userId) {
        return user.findOrCreate(userId);
      }))
      .then(function() {
        return role.update(id, data);
      });
    });
});

module.exports = controller;
