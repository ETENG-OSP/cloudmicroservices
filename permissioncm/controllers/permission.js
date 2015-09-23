var cmlib = require('cmlib');
var nconf = require('nconf');

var config = nconf.get();

var controller = cmlib.resourceController('permission', ['roles'], config);

module.exports = controller;
