var factory = require('../lib/create-resource-controller');
var controller = factory('user', ['roles']);
module.exports = controller;
