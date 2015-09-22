var Waterline = require('waterline');
var waterline = new Waterline();
var Application = Waterline.Collection.extend(require('../models/application'));
waterline.loadCollection(Application);

// console.log('create application store');

var collection = new Promise(function(resolve, reject) {
  // console.log(Application);
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
    // console.log('after init');
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
