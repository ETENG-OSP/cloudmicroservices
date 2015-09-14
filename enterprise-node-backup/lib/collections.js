var Waterline = require('waterline');
var Promise = require('bluebird');

var waterline = new Waterline();

var opts = {
  adapters: {
    disk: require('sails-disk')
  },
  connections: {
    filestore: {
      adapter: 'disk'
    }
  }
};

require('../models').forEach(function(config) {
  var Collection = Waterline.Collection.extend(config);
  waterline.loadCollection(Collection);
});

var init = new Promise(function(resolve, reject) {
  waterline.initialize(opts, function(err, ontology) {
    if (err) {
      return reject(err);
    }
    collections = ontology.collections;
    resolve(ontology.collections);
  });
});

function get(name) {
  return init.then(function(collections) {
    return collections[name];
  });
}

exports.get = get;
