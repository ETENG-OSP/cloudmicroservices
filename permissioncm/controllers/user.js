var resourceController = require('../lib/resource-controller');
var collections = require('../lib/collections');

var controller = resourceController('user', ['roles']);

controller.usable = function(req, res, next) {

  var id = req.swagger.params.id.value;
  var appId = req.cm.appId;

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
