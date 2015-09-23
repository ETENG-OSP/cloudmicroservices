var inject = require('./inject');
var model = require('./model');

function factory(appConfig, req, res, next) {

  return {
    getParam: getParam,
    getCurrentApp: getCurrentApp,
    realm: realm
  };

  function getParam(name) {
    console.log('getting:', name);
    return req.swagger.params[name].value;
  }

  function getCurrentApp() {
    return req.cm.appId;
  }

  function realm(resolver) {
    var appId = req.cm.appId;
    return inject(resolver, function(name) {
      return model(name, appId);
    });
  }

}

module.exports = factory;
