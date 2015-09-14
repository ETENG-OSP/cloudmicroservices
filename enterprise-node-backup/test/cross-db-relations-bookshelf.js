var faker = require('faker');
var User = require('../models/user');
var Role = require('../models/role');

describe('cross db many to many relations - bookshelf', function() {

  describe('create', function() {

    it('a to b should be ok', function() {

      var _user, _role;
      return User
        .forge({
          application: 1,
          username: faker.internet.userName(),
          password: faker.internet.password()
        })
        .save()
        .then(function(results) {
          _user = results;
          return Role
            .forge({
              application: 1
            })
            .save();
        })
        .then(function(results) {
          _role = results;

          return _user.roles().attach(_role);
        });

    });

    it('b to a should be ok', function() {

      var _user, _role;
      return User
        .forge({
          application: 1,
          username: faker.internet.userName(),
          password: faker.internet.password()
        })
        .save()
        .then(function(results) {
          _user = results;
          return Role
            .forge({
              application: 1
            })
            .save();
        })
        .then(function(results) {
          _role = results;

          return _role.users().attach(_user);
        });

    });

  });

  describe('query', function() {

    it('a to b should be ok', function() {

      return User
        .forge({
          application: 1,
          username: faker.internet.userName(),
          password: faker.internet.password()
        })
        .save()
        .then(function(results) {
          _user = results;
          return Role
            .forge({
              application: 1
            })
            .save();
        })
        .then(function(results) {
          _role = results;

          return _user.roles().attach(_role);
        })
        .then(function() {
          return User
            .forge({id: _user.toJSON().id})
            .fetch()
            // .fetch({withRelated: ['roles']})
        })
        .then(function(results) {
          console.log(results);
        });

    });

    it('b to a should be ok', function() {

      return User
        .forge({
          application: 1,
          username: faker.internet.userName(),
          password: faker.internet.password()
        })
        .save()
        .then(function(results) {
          _user = results;
          return Role
            .forge({
              application: 1
            })
            .save();
        })
        .then(function(results) {
          _role = results;

          return _user.roles().attach(_role);
        })
        .then(function() {
          return Role
            .forge({id: _role.toJSON().id})
            .fetch()
        })
        .then(function(results) {
          console.log(results);
        })

    });

  });

});
