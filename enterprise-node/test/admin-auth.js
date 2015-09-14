var should = require('should');
var Promise = require('bluebird');
var faker = require('faker');
var request = Promise.promisifyAll(require('request'));
var ApplicationController = require('../controllers/application');

describe('application', function() {

  before(function() {
    return require('../server').start();
  });

  var credentials = {
    username: faker.internet.userName(),
    password: faker.internet.password()
  };

  describe('signup', function() {
    it('should create an user', function() {
      return request.postAsync('http://localhost:3003/auth/signup', {
        json: credentials
      }).spread(function(response, body) {
        console.log(body);
      });
    });
  });

  describe('login', function() {
    it('should return token', function() {
      return request.postAsync('http://localhost:3003/auth/login', {
        json: credentials
      }).spread(function(response, body) {
        console.log(body);
      });
    });
  });

});
