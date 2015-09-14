var collections = require('../lib/collections');
var jwt = require('jsonwebtoken');

function find(args) {
  return collections
    .get('feature')
    .then(function(Feature) {
      return Feature.find(args);
    })
}

function findOne(args) {
  return collections
    .get('feature')
    .then(function(Feature) {
      return Feature.findOne(args);
    })
}

function create(args) {
  return collections
    .get('feature')
    .then(function(Feature) {
      return Feature.create(args)
    })
}

function destroy(id) {
  return collections
    .get('feature')
    .then(function(Feature) {
      return Feature.destroy(id);
    });
}

function update(id, args) {
  return collections
    .get('feature')
    .then(function(Feature) {
      return Feature.update(id, args);
    })
    .then(function(result) {
      return result[0];
    });
}

function generateToken(featureId, applicationId) {
  return collections
    .get('feature')
    .then(function(Feature) {
      return Feature.findOne(featureId);
    })
    .then(function(feature) {
      var secret = feature.secret;
      console.log(feature);
      var token = jwt.sign({}, secret, {
        issuer: featureId,
        audience: applicationId,
        noTimestamp: true
      });
      return token;
    });
}

exports.find = find;
exports.findOne = findOne;
exports.create = create;
exports.destroy = destroy;
exports.update = update;
exports.generateToken = generateToken;
