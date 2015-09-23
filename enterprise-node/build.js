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

var files = [
  {
    src: '/public/admin/js/app.template.js',
    dest: '/public/admin/js/app.js'
  },
  {
    src: '/public/admin/partials/app-settings.template.html',
    dest: '/public/admin/partials/app-settings.html'
  },
  {
    src: '/public/store/js/app.template.js',
    dest: '/public/store/js/app.js'
  }
]

files.forEach(function(file) {
  var template = _.template(fs.readFileSync(__dirname + file.src).toString());
  var compiled = template(context);
  fs.writeFileSync(__dirname + file.dest, compiled);
});
