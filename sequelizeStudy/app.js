var Sequelize = require('sequelize');
var _ = require('underscore');

function translateToSequelizeType(type) {
  var dic = {
    string: Sequelize.STRING
  };
  return dic[type];
}

function createSequelizeAttributes(schema) {
  var attributes = _.reduce(schema.properties, function(memo, value, key) {
    memo[key] = {
      type: translateToSequelizeType(value.type)
    };
    return memo;
  }, {});
  return attributes;
}

function ModelFactory(sequelize, schema) {
  var attributes = createSequelizeAttributes(schema);
  return sequelize.define(schema.title, attributes);
}

function getRealmConnection(connections, realm, options) {
  connections[realm] = connections[realm] || createConnection(realm, options);
  return connections[realm];
}

function createConnection(realm, options) {
  var type = options.type;
  var database;
  var storage;

  switch(type) {
  case 'sqlite':
    database = options.database;
    storage = options.database + realm + '.sqlite';
    break;
  default:
    database = options.database + realm;
  }

  var connection = new Sequelize(database, null, null, {
    dialect: type,
    storage: storage
  });
  return connection;
}

function getRealmModel(models, realm, modelName) {
}

// =========================

var realm = '1';
var connections = {};
var options = {
  database: 'test',
  type: 'sqlite'
};

var connection = getRealmConnection(connections, realm, options);
var schema = require('./meat.json');
var Meat = ModelFactory(connection, schema);

function ModelManager() {
}

ModelManager.prototype.registerModel = function(name, schema) {
};

ModelManager.prototype.connectModel = function(realm, ) {
};



Meat.sync().then(function(Meat) {
  return Meat.create({
    name: 'beef'
  });
  console.log(Meat);
}).then(function(meat) {
  console.log(meat.toJSON());
});
