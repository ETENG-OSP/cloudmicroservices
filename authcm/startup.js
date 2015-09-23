#!/usr/bin/env node

var nconf = require('nconf');
var cmlib = require('cmlib');

nconf.argv().env().file({file: 'config.json'});

module.exports = cmlib
  .startup(nconf.get())
  .then(function() {
    console.log('> auth server started at 3002');
  });
