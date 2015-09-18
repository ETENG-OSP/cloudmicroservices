var Waterline = require('waterline');
var waterline = new Waterline();
var Application = Waterline.Collection.extend(require('../models/application'));
waterline.loadCollection(Application);

var collection = new Promise(function(resolve, reject) {
  waterline.initialize({
    adapters: {
      disk: require('sails-disk')
    },
    connections: {
      appstore: {
        adapter: 'disk'
      }
    }
  }, function(err, ontology) {
    if (err) {
      return reject(err);
    }
    resolve(ontology.collections.application);
  });
});

function get() {
  return collection;
}

exports.get = get;
