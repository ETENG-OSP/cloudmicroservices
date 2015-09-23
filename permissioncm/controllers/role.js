var Promise = require('bluebird');
var cmlib = require('cmlib');
var _ = require('underscore');
var nconf = require('nconf');

var config = nconf.get();

var controller = cmlib.resourceController('role', ['permissions', 'users'], config);

// collection.override('update', function(data) {
//
//   return this.realm(function(user) {
//   });
//
// });
//
// var update = controller.update;
// controller.update = function(req, res, next) {
//
//   var appId = req.cm.appId;
//   var data = req.swagger.params.data.value;
//
//   return collections(appId)
//     .get('user')
//     .then(function(User) {
//       return Promise.all(_.map(data.users, function(userId) {
//         return User.findOrCreate(userId);
//       }));
//     })
//     .then(function() {
//       return update(req, res, next);
//     });
// };

module.exports = controller;
