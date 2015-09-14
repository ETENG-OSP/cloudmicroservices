angular
  .module('app')
  .factory('Application', ApplicationFactory);

function ApplicationFactory($resource, config) {
  return $resource('/api/applications/:id', {
    id: '@id'
  }, {
    obtainToken: {
      method: 'GET',
      url: config.storeHost +
        'api/features/:featureId/applications/:appId/token'
    },
    uninstall: {
      method: 'DELETE',
      url: '/api/applications/:id/features/:featureId'
    }

  });
}
