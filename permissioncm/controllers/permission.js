var factory = require('../lib/create-resource-controller');

var controller = factory('permission', ['roles']);

module.exports = controller;
