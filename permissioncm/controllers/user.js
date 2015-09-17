var _ = require('underscore');

var resourceController = require('../lib/resource-controller');
var collections = require('../lib/collections');

var controller = resourceController('user', ['roles']);

controller.usable = function(req, res, next) {

  var id = req.swagger.params.id.value;
  var appId = req.cm.appId;
  var Platform;

  return collections(appId)
    .get('user')
    .then(function(User) {
      return Promise.all([
        User.findOrCreate(id).populate('roles'),
        collections(appId).get('role'),
        collections(appId).get('platform')
      ]);
    })
    .spread(function(user, Role, _Platform) {
      Platform = _Platform;
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
    })
    .then(function(permissions) {
      return res.json(permissions);
    })
    .catch(next);
};

module.exports = controller;
