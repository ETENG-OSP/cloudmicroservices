angular
  .module('app')
  .factory('Application', ApplicationFactory);

function ApplicationFactory($resource) {
  return $resource('/api/applications/:id', {
    id: '@id'
  }, {

    obtainToken: {
      method: 'GET',
      url: '//localhost:3004/api/features/:featureId/applications/:appId/token'
    },

    uninstall: {
      method: 'DELETE',
      url: '/api/applications/:id/features/:featureId'
    }

  });
}
