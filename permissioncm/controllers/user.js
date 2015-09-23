var _ = require('underscore');
var cmlib = require('cmlib');

var controller = cmlib.resourceController('user', ['roles']);

controller.operation('usable', function(id) {
  var Role, Platform;

  return this
    .realm(function(user, role, platform) {
      Role = role;
      Platform = platform;
      return user
        .findOrCreate(id)
        .populate('roles');
    })
    .then(function(user) {
      return Promise.all(user.roles.map(function(role) {
        return Role
          .findOne(role.id)
          .populate('permissions');
      }));
    })
    .then(function(roles) {
      var permissions = roles.reduce(function(memo, role) {
        role.permissions.forEach(function(permission) {
          memo[permission.id] = permission.toJSON();
        });
        return memo;
      }, {});

      return Promise.all(_.map(permissions, function(permission) {
        delete permission.createdAt;
        delete permission.updatedAt;
        return Platform
          .findOne(permission.platform)
          .then(function(platform) {
            delete platform.createdAt;
            delete platform.updatedAt;
            permission.platform = platform;
            return permission;
          });
      }));
    });

});

module.exports = controller;
