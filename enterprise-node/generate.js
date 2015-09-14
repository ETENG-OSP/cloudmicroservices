var fs = require('fs');
var config = require('./lib/config');

fs.writeFileSync(
  __dirname + '/public/demo/js/config.js',
  'var config = ' + JSON.stringify(config, null, 2) + ';'
);

fs.writeFileSync(
  __dirname + '/public/admin/js/config.js',
  'var config = ' + JSON.stringify(config, null, 2) + ';'
);

fs.writeFileSync(
  __dirname + '/public/auth/js/config.js',
  'var config = ' + JSON.stringify(config, null, 2) + ';'
);

fs.writeFileSync(
  __dirname + '/public/permission/js/config.js',
  'var config = ' + JSON.stringify(config, null, 2) + ';'
);
