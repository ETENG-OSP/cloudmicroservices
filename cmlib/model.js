var Promise = require('bluebird');
var Waterline = require('waterline');
console.log('requiring nconf');
var nconf = require('nconf');

var models = {};

function getter(modelName, appId) {
  models[appId] = models[appId] || createConnection(appId);
  return models[appId]
    .then(function(ontology) {
      return ontology.collections[modelName];
    });
}

function createConnection(appId) {
  var models = nconf.get('application:models');
  var prefix = nconf.get('store:prefix');
  var adapter = nconf.get('store:adapter');

  var connectionName = prefix + 'store-' + appId;
  var waterline = new Waterline();
  var opts = createWaterlineOptions(connectionName, adapter);
  var deferred = Promise.defer();

  require.main.require(models).forEach(function(modelConfig) {
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
}

function createWaterlineOptions(connectionName, adapterName) {
  var options = {
    adapters: {store: require(adapterName)},
    connections: {}
  };
  options.connections[connectionName] = {adapter: 'store'};
  return options;
}

module.exports = getter;
