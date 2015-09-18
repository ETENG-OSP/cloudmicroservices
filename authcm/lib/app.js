var express = require('express');
var swaggerTools = require('swagger-tools');
var cors = require('cors');
var jsonRefs = require('json-refs');
var _ = require('underscore');
var Promise = require('bluebird');

var cmSwaggerSecurity = require('./cm-swagger-security');

function factory(opts) {
  var app = express();
  app.use(cors());
  // app.use(cors());
  // app.use(morgan('dev'));
  // app.use(express.static(__dirname + '/../public'));

  var securityOptions = cmSwaggerSecurity(opts);
  var routerOptions = {controllers: __dirname + '/../controllers'};
  var validatorOptions = {validateResponse: false};

  return jsonRefs
    .resolveRefs(require('../api/swagger'), {
      location: __dirname + '/../api'
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
    .then(function(middleware) {
      app.use(middleware.swaggerMetadata());
      app.use(middleware.swaggerSecurity(securityOptions));
      app.use(middleware.swaggerValidator(validatorOptions));
      app.use(middleware.swaggerRouter(routerOptions));
      app.use(middleware.swaggerUi());
      return app;
    });
}

module.exports = factory;
