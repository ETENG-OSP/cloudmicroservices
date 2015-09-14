var bcrypt = require('bcrypt');
var Promise = require('bluebird');

function comparePassword(password, hash) {
  return new Promise(function(resolve, reject) {
    console.log('> compare:', password, hash);
    bcrypt.compare(password, hash, function(err, res) {
      if (err) {
        throw err;
      }
      resolve(res);
    });
  });
}

module.exports = comparePassword;
