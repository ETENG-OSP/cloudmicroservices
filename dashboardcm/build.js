var nconf = require('nconf');
var fs = require('fs');
var _ = require('underscore');

nconf.env();

if (nconf.get('NODE_ENV') === 'production') {
  var context = {
    hostname: '192.168.0.35'
  };
} else {
  var context = {
    hostname: 'localhost'
  };
}

var src = 'dashboardcm/public/index.template';
var dest = 'dashboardcm/public/index.html';

var template = _.template(fs.readFileSync(src));
var compiled = template(context);
fs.writeFileSync(dest);
