var cmlib = require('cmlib');
var nconf = require('nconf');

var config = nconf.get();

var controller = cmlib.resourceController('platform', null, config);

module.exports = controller;
