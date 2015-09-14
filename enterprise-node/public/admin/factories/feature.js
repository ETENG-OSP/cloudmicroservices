angular
  .module('app')
  .factory('Feature', FeatureFactory);

function FeatureFactory($resource, config) {
  return $resource(config.storeHost + 'api/features/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    },
    generateToken: {
      method: 'GET',
      url: '/api/features/:id/applications/:appId/token'
    }
  });
}
