var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('../lib/config');

var secret = config.secret;
var expiresInMinutes = config.expiresInMinutes || 30;

function createJWT(info) {
  var subject = info.id;
  var audience = info.audience;
  // var username = info.get('username');
  // console.log();

  var token = jwt.sign({
    // username: username
  }, secret, {
    subject: subject,
    audience: audience,
    expiresInMinutes: expiresInMinutes
  });
  return token;
}

module.exports = createJWT;
