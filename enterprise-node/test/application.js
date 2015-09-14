var should = require('should');
var Promise = require('bluebird');
var faker = require('faker');
var request = Promise.promisifyAll(require('request'));
var ApplicationController = require('../controllers/application');

describe('application', function() {

  before(function() {
    return require('../server').start();
  });

  describe('create', function() {
    it('should return an application entity', function() {
      return request.postAsync('http://localhost:3003/api/applications', {
        json: {
          name: faker.company.companyName()
        }
      }).spread(function(response, body) {
        console.log(body);
      });
    });
  });

  describe('find', function() {
    it('should return many applications', function() {
      return request.getAsync('http://localhost:3003/api/applications')
        .spread(function(response, body) {
          console.log(JSON.parse(body));
        });
    });
  });
});
