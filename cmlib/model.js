var Promise = require('bluebird');
var Waterline = require('waterline');
var configure = require('./configure');

var models = {};

function getter(modelName, appId) {
  models[appId] = models[appId] || createConnection(appId);
  return models[appId]
    .then(function(ontology) {
      return ontology.collections[modelName];
    });
}

function createConnection(appId) {
  return configure().then(function(appConfig) {
    var models = appConfig.models;
    var connectionName = appConfig.storeName + 'store-' + appId;
    var waterline = new Waterline();
    var opts = createWaterlineOptions(connectionName);
    var deferred = Promise.defer();

    require(models).forEach(function(modelConfig) {
      modelConfig.connection = connectionName;
      var collection = Waterline.Collection.extend(modelConfig);
      waterline.loadCollection(collection);
    });

    waterline.initialize(opts, function(err, ontology) {
      if (err) {
        return deferred.reject(err);
      }
      deferred.resolve(ontology);
    });
    return deferred.promise;
  });
}

function createWaterlineOptions(connectionName) {
  var options = {
    adapters: {disk: require('sails-disk')},
    connections: {}
  };
  options.connections[connectionName] = {adapter: 'disk'};
  return options;
}

module.exports = getter;
