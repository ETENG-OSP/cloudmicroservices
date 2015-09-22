var Promise = require('bluebird');

function inject(resolver, getter, context) {
  var args;
  if (Array.isArray(resolver.$inject)) {
    if (typeof getter === 'function') {
      args = resolver.$inject.map(getter.bind(context));
      return Promise.all(args)
        .then(function(results) {
          return resolver.apply(context, results);
        });
    }
  }
  return Promise
    .resolve()
    .then(function() {
      return resolver.apply(context);
    });
}

module.exports = inject;
