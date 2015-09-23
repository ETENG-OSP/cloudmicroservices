var nconf = require('nconf');
var fs = require('fs');
var _ = require('underscore');

nconf.env();

if (nconf.get('NODE_ENV') === 'test') {
  var context = {
    hostname: '192.168.0.35'
  };
} else {
  var context = {
    hostname: 'localhost'
  };
}

var src = __dirname + '/public/index.template';
var dest = __dirname + '/public/index.html';

var template = _.template(fs.readFileSync(src).toString());
var compiled = template(context);
fs.writeFileSync(dest, compiled);
