var express = require('express');
var swaggerTools = require('swagger-tools');
var cors = require('cors');
var jsonRefs = require('json-refs');
var _ = require('underscore');
var Promise = require('bluebird');

var cmSwaggerSecurity = require('../cmlib/cm-swagger-security');

var securityOptions = cmSwaggerSecurity(require('./config'));

var routerOptions = {
  controllers: __dirname + '/../controllers'
};

var validatorOptions = {
  validateResponse: false
};

function factory() {
  var app = express();
  app.use(cors());

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
      console.log(JSON.stringify(compiled, null, 2));

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

// var express = require('express');
// var bodyParser = require('body-parser');
// var morgan = require('morgan');
// var cors = require('cors');
// var cmlib = require('../cmlib');
//
// var cm = cmlib(require('./config'));
// var app = express();
//
// app.use(cors());
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
//
// app.use(express.static(__dirname + '/../public'));
//
// app.use(cm.verify);
// app.use(cm.issuerCheck);
// app.use(cm.audienceCheck);
//
// app.use(require('../routers/api'));
//
// module.exports = app;
