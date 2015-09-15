var express = require('express');
var swaggerTools = require('swagger-tools');
var Promise = require('bluebird');

var cmSwagger = require('../cmlib/cm-swagger');

function factory(opts) {
  return new Promise(function(resolve, reject) {
    opts = opts || require('./swagger');
    var cm = cmSwagger(require('./config'));

    var routerOptions = {
      controllers: __dirname + '/../controllers'
    };

    var securityOptions = {
      cmjwt: function(req, definitions, apiKey, callback) {
        cm
          .verify(apiKey)
          .then(function(payload) {
            console.log('> pass api key check');
            req.cm = {
              payload: payload,
              appId: payload.aud
            };
            callback();
          })
          .catch(function(err) {
            console.log('> fail api key check');
            callback(err);
          });
      }
    };

    var uiOptions = {
      swaggerUiDir: './swagger-ui/dist'
    };

    var app = express();
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
// var cors = require('cors');
// var cmlib = require('../cmlib');
// var config = require('./config');

// app.use(cors());
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
