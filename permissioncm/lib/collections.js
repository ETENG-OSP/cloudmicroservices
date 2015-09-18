var Waterline = require('waterline');
var Promise = require('bluebird');
var _ = require('underscore');

var storeName = require('../config').storeName;
var connections = {};

function getCollectionsForApplication(appId) {
  var connectionName = storeName + 'store-' + appId;
  if (!connections[connectionName]) {
    connections[connectionName] = createConnection(connectionName);
  }
  return connections[connectionName];
}

function createConnection(connectionName) {
  var connect = new Promise(function(resolve, reject) {
    var waterline = new Waterline();
    var opts = createOptions(connectionName);
    loadCollections(waterline, connectionName);

    waterline.initialize(opts, function(err, ontology) {
      if (err) {
        return reject(err);
      }
      resolve(ontology.collections);
    });
  });

  return {
    get: function(modelName) {
      return connect.then(function(collections) {
        return collections[modelName];
      });
    }
  };
}

function loadCollections(waterline, connectionName) {
  require('../models').forEach(function(config) {
    config.connection = connectionName;
    var collection = Waterline.Collection.extend(config);
    waterline.loadCollection(collection);
  });
  return waterline;
}

function createOptions(connectionName) {
  var options = {
    adapters: {disk: require('sails-disk')},
    connections: {}
  };
  options.connections[connectionName] = {adapter: 'disk'};
  return options;
}

module.exports = getCollectionsForApplication;
