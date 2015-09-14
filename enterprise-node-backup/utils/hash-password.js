var bcrypt = require('bcrypt');
var Promise = require('bluebird');

function hashPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, 8, function(err, hash) {
      if (err) {
        throw err;
      }
      resolve(hash);
    });
  });
}

module.exports = hashPassword;
