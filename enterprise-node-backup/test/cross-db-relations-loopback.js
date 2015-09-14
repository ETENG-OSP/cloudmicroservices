var faker = require('faker');
var loopback = require('loopback');
var Promise = require('bluebird');

var ds1 = loopback.createDataSource('db1', {adapter: 'memory'});
var ds2 = loopback.createDataSource('db2', {adapter: 'memory'});

var User = ds1.createModel('User', {
  name: 'string'
}, {
  base: 'PersistedModel',
  relations: {
    roles: {
      model: 'Role',
      type: 'hasAndBelongsToMany'
    }
  }
});

var Role = ds2.createModel('Role', {
  name: 'string'
}, {
  base: 'PersistedModel',
  relations: {
    users: {
      model: 'User',
      type: 'hasAndBelongsToMany'
    }
  }
});

var RoleUser = ds2.createModel('RoleUser', {
}, {
  base: 'PersistedModel',
  relations: {
    users: {
      model: 'User',
      type: 'belongsTo'
    },
    roles: {
      model: 'Role',
      type: 'belongsTo'
    }
  }
});

describe('cross db many to many relations - loopback', function() {

  describe('create', function() {

    it('a to b should be ok', function(done) {
      User.create(function(err, user) {
        user.roles.add({}, function(err) {
          console.log(arguments);
        });
        // done();
      });

      // var createUser = Promise.promisify(User.create, User);
      // var _user, _role;
      // return createUser({name: faker.internet.userName()}).then(function(results) {
      //     var createRole = Promise.promisify(Role.create, User);
      //     _user = results;
      //     return createRole({
      //       name: faker.internet.userName()
      //     });
      //   })
      //   .then(function(results) {
      //     var findUser = Promise.promisify(User.findOne, User);
      //     _role = results;
      //     return findUser({
      //       where: {
      //         id: _user.id
      //       }
      //     });
      //   })
      //   .then(function(results) {
      //     console.log(results);
      //
      //   })
        // var addRole = Promise.promisify(_user.roles.add, _user.roles);
        // return addRole(_role);
    });

    it('b to a should be ok', function() {
      throw new Error('not implements');
    });

  });

  describe('query', function() {

    it('a to b should be ok', function() {
      throw new Error('not implements');
    });

    it('b to a should be ok', function() {
      throw new Error('not implements');
    });

  });

});
