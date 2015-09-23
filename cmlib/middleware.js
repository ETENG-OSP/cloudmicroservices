var express = require('express');
var swaggerTools = require('swagger-tools');
var cors = require('cors');
var jsonRefs = require('json-refs');
var _ = require('underscore');
var Promise = require('bluebird');
var path = require('path');

var security = require('./security');

function factory(opts) {

  opts = opts || {};

  var controllers = opts.application.controllers;
  var api = opts.application.api;
  var secret = opts.platform.secret;

  console.log('using secret:', secret);

  var securityOptions = {cmApiKey: security(secret)};
  var routerOptions = {controllers: controllers};
  var validatorOptions = {validateResponse: false};

  return jsonRefs
    .resolveRefs(require.main.require(api), {
      location: path.dirname(api)
    })
    .then(function(results) {
      // console.log(JSON.stringify(results, null, 2));
      var deferred = Promise.defer();
      var swaggerObject = results.resolved;

      var swaggerString = JSON.stringify(swaggerObject);
      var template = _.template(swaggerString);
      var compiled = JSON.parse(template());

      // console.log(JSON.stringify(compiled, null, 2));
      swaggerTools.initializeMiddleware(compiled, function(middleware) {
        deferred.resolve(middleware);
      });

      return deferred.promise;
    })
    .then(function(middlewares) {
      var router = express.Router();
      router.use(cors());
      router.use(middlewares.swaggerMetadata());
      router.use(middlewares.swaggerSecurity(securityOptions));
      router.use(middlewares.swaggerValidator(validatorOptions));
      router.use(middlewares.swaggerRouter(routerOptions));
      router.use(middlewares.swaggerUi());
      return router;
    })
    .catch(function(err) {
      console.error(err);
      throw err;
    });
}

module.exports = factory;
