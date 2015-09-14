angular
  .module('app')
  .factory('Application', ApplicationFactory);

function ApplicationFactory($resource, config) {

  return $resource(config.registryHost + 'api/applications/:appId', {
    appId: '@id'
  }, {
    install: {
      method: 'POST',
      url: config.registryHost + 'api/applications/:appId/features/:featureId'
    }
  });

}
