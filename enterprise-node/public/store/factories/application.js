angular
  .module('app')
  .factory('Application', ApplicationFactory);

function ApplicationFactory($resource) {
  return $resource('//localhost:3003/api/applications/:appId', {
    appId: '@id'
  }, {
    install: {
      method: 'POST',
      url: '//localhost:3003/api/applications/:appId/features/:featureId'
    }
  });
}
