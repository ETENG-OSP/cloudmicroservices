var Promise = require('bluebird');
var Context = require('./context');
var inject = require('./inject');

function Controller() {
  return {
    operation: operation
  };
}

function operation(id, resolver) {
  this[id] = function(req, res, next) {
    console.log('controller invoke');
    var context = new Context(req, res, next);
    var result = inject(resolver, context.getParam, context);
    Promise
      .resolve(result)
      .then(function(results) {
        res.json(results);
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json(err);
      });
  };
}

module.exports = Controller;