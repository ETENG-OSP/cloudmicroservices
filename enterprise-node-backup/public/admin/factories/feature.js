angular
  .module('app')
  .factory('Feature', FeatureFactory);

function FeatureFactory($resource) {
  return $resource('//localhost:3004/api/features/:id', {
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
