var inject = require('./inject');
var model = require('./model');

function Context(req, res, next, config) {
  this.req = req;
  this.res = res;
  this.next = next;
  this.config = config;
}

Context.prototype.getParam = function(name) {
  console.log('getting:', name);
  console.log(this.req.swagger.params[name]);
  return this.req.swagger.params[name].value;
};

Context.prototype.getCurrentApp = function() {
  return this.req.cm.appId;
};

Context.prototype.realm = function(resolver) {
  var config = this.config;
  var appId = this.req.cm.appId;

  console.log('realm');
  console.log(resolver);

  return inject(resolver, function(name) {
    console.log('injecting:', name);
    return model(name, appId, config);
  });
};

module.exports = Context;
