var factory = require('../lib/create-resource-controller');
var collections = require('../lib/collections');

var controller = factory('user', ['roles']);

controller.usable = function(id, appId) {
  return collections(appId)
    .get('user')
    .then(function(User) {
      return User
        .findOrCreate()
        .populate('roles');
    })
    .then(function(user) {
      return user;
    });
};

module.exports = controller;
