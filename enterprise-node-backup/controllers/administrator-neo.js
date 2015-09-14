var collections = require('../lib/collections');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var createJWT = require('../utils/create-jwt');

function signup(credentials) {
  return collections
    .get('administrator')
    .then(function(Administrator) {
      return Administrator.signup(credentials);
    });
}

function login(credentials) {
  return collections
    .get('administrator')
    .then(function(Administrator) {
      return Administrator.login(credentials);
    })
    .then(function(admin) {
      return {
        id: admin.id,
        token: createJWT(admin)
      };
    });
}

function getAdminToken(requestToken) {
  return collections
    .get('feature')
    .then(function(Feature) {
      var payload = jwt.decode(requestToken);
      return Promise.all([
        Feature.findOne(payload.iss),
        collections.get('administrator')
      ]);
    })
    .spread(function(feature, Administrator) {
      var payload = jwt.verify(requestToken, feature.secret);
      return Promise.all([
        Administrator.login(payload),
        feature.secret
      ]);
    })
    .spread(function(admin, secret) {
      var payload = jwt.decode(requestToken);
      var token = jwt.sign({
        scope: ['admin']
      }, secret, {
        noTimestamp: true,
        issuer: payload.iss,
        audience: payload.aud,
        subject: admin.id
      });
      return token;
    });
}

exports.signup = signup;
exports.login = login;
exports.getAdminToken = getAdminToken;
