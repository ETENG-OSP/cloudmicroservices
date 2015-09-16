var express = require('express');
var swaggerTools = require('swagger-tools');
var cors = require('cors');
var Promise = require('bluebird');

var cmSwagger = require('../cmlib/cm-swagger');
var cmSwaggerSecurity = require('../cmlib/cm-swagger-security');

function factory(opts) {
  return new Promise(function(resolve, reject) {
    opts = opts || require('./swagger');

    var securityOptions = cmSwaggerSecurity({
      cm: cmSwagger(require('./config'))
    });

    var routerOptions = {
      controllers: __dirname + '/../controllers'
    };

    var app = express();
    app.use(cors());

    swaggerTools.initializeMiddleware(opts, function(middleware) {
      app.use(middleware.swaggerMetadata());
      app.use(middleware.swaggerSecurity(securityOptions));
      app.use(middleware.swaggerValidator());
      app.use(middleware.swaggerRouter(routerOptions));
      app.use(middleware.swaggerUi());
      resolve(app);
    });

  });
}

module.exports = factory;

// var morgan = require('morgan');

// app.use(morgan('dev'));
// app.use(express.static(__dirname + '/../public'));
// var cm = cmlib();
//
// app.use(cm.verify);
// app.use(cm.issuerCheck);
// app.use(cm.audienceCheck);
//
// app.use(require('../routers/auth'));
// app.use(require('../routers/api'));
