var faker = require('faker');
var Waterline = require('waterline');
var sailsMemoryAdapter = require('sails-memory');
var sailsMySQLAdapter = require('sails-mysql');
var Promise = require('bluebird');
var should = require('should');

var waterline = new Waterline();

var userCollection = Waterline.Collection.extend({
  identity: 'user',
  connection: 'auth',
  attributes: {
    username: 'string',
    password: 'string',

    roles: {
      collection: 'role',
      via: 'users'
    }
  }
});

var roleCollection = Waterline.Collection.extend({
  identity: 'role',
  connection: 'permission',
  attributes: {
    name: 'string',

    users: {
      collection: 'user',
      via: 'roles',
      dominant: true
    }
  }
});

var User, Role;

waterline.loadCollection(userCollection);
waterline.loadCollection(roleCollection);

var initialize = Promise.promisify(waterline.initialize, waterline);

describe('cross db many to many relations - waterline', function() {

  before(function() {
    return initialize({
      adapters: {
        mysql: sailsMySQLAdapter
      },
      connections: {
        permission: {
          adapter: 'mysql',
          module: 'sails-mysql',
          host: '0.0.0.0',
          user: 'root',
          database: 'waterline'
        },
        auth: {
          adapter: 'mysql',
          module: 'sails-mysql',
          host: '0.0.0.0',
          user: 'root',
          database: 'waterline_auth'
        }
      }
    }).then(function(ontology) {
      User = ontology.collections.user;
      Role = ontology.collections.role;
    });
  });

  describe('create', function() {

    var _user1, _user2, _role1, _role2;
    before(function() {

      return Promise.all([
        User.create({
          username: faker.internet.userName(),
          password: faker.internet.password()
        }),
        User.create({
          username: faker.internet.userName(),
          password: faker.internet.password()
        }),
        Role.create({
          name: faker.name.jobTitle()
        }),
        Role.create({
          name: faker.name.jobTitle()
        })
      ]).spread(function(user1, user2, role1, role2) {
        _user1 = user1;
        _user2 = user2;
        _role1 = role1;
        _role2 = role2;

        role1.users.add([user1, user2]);
        user1.roles.add(role2);
        user2.roles.add(role2);
        return Promise.all([
          role1.save(),
          user1.save(),
          user2.save()
        ]);
      }).then(function() {
        _user1.roles.add(_role1);
        return _user1.save();
      });

    });

    it('a to b should be ok', function() {
      return User
        .findOne(_user1.id)
        .populate('roles')
        .then(function(results) {
          results.roles
            .should.be.an.instanceOf(Array)
            .and.have.length(2);
        });
    });

    it('b to a should be ok', function() {
      return Role
        .findOne(_role1.id)
        .populate('users')
        .then(function(results) {
          results.users
            .should.be.an.instanceOf(Array)
            .and.have.length(2);
        });
    });

  });

});
