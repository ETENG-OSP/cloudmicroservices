var Promise = require('bluebird');

var ARROW_ARG = /^([^\(]+?)=>/;
var FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function extractArgs(fn) {
  var fnText = fn.toString().replace(STRIP_COMMENTS, '');
  var args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
  return args;
}

function inject(resolver, getter, context) {
  var args;
  var deps;

  if (Array.isArray(resolver.$inject)) {
    deps = resolver.$inject;
  } else if (typeof resolver === 'function') {
    deps = getArguments(resolver);
  } else {
    deps = [];
  }

  if (typeof getter === 'function') {
    args = deps.map(getter.bind(context));
  } else {
    args = [];
  }

  return Promise.all(args)
    .then(function(results) {
      return resolver.apply(context, results);
    });
}

function getArguments(fn) {
  var args = extractArgs(fn)[1];
  console.log(args);
  if (args.length === 0) {
    return [];
  }
  return args.split(FN_ARG_SPLIT).map(function(arg) {
    return arg.trim();
  });
}

module.exports = inject;
