function Model() {
}

function WaterlineModel() {
}

WaterlineModel.prototype.getModel = function(modelName) {
  var collections = this.connection.collections;
  return collections[modelName];
};

function Context() {
}

function SwaggerContext() {
}

SwaggerContext.prototype.getParam = function(paramName) {
  var req = this.transport.req;
  return req.swagger.params[paramName].value;
};

function express(resolver) {
  return function(req, res, next) {
    var application = new Application();
    application
      .prepare()
      .then(function(app) {
        var context = new Context(app);
        return context.prepare();
      })
      .then(function(ctx) {
        return inject(resolver, getParam, ctx);
      })
      .then(function(result) {
        return transport.handleSuccess(result);
      })
      .then(function(err) {
        return transport.handleError(err);
      });
  };
}

function seneca(resolver) {
  return function(args, callback) {
    var context = new Context();
  };
}

function socketIO(resolver) {
  return function() {
  };
}

function zmq(resolver) {
}
