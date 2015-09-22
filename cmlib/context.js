var inject = require('./inject');
var model = require('./model');

function Context(req, res, next) {
  this.req = req;
  this.res = res;
  this.next = next;
}

Context.prototype.getParam = function(name) {
  console.log('getting:', name);
  return this.req.swagger.params[name].value;
};

Context.prototype.realm = function(resolver) {
  var appId = this.req.cm.appId;

  console.log('realm');
  console.log(resolver);

  return inject(resolver, function(name) {
    console.log('injecting:', name);
    return model(name, appId);
  });
};

module.exports = Context;
