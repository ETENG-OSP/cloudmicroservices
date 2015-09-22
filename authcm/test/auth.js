var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var should = require('should');
var faker = require('faker');
var jwt = require('jsonwebtoken');
var config = require('../config');

describe('auth', function() {

  before(function() {
    return require('../server').start();
  });

  var token = jwt.sign({}, config.secret, {
    issuer: config.id,
    audience: 'test'
  });

  var credentials = {
    username: faker.internet.userName(),
    password: faker.internet.password()
  };

  describe('api', function() {

    it('should signup', function() {
      return request.postAsync('http://localhost:3002/auth/signup', {
        qs: {token: token},
        json: credentials
      }).spread(function(response, body) {
        body.should.have.property('userId');
      });
    });

    it('should login', function() {
      return request.postAsync('http://localhost:3002/auth/login', {
        qs: {token: token},
        json: credentials
      }).spread(function(response, body) {
        body.should.have.property('token');
      });
    });

  });

});
