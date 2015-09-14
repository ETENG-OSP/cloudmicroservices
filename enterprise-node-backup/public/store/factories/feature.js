angular
  .module('app')
  .factory('Feature', FeatureFactory);

function FeatureFactory($resource) {
  return $resource('/api/features/:id', {
    id: '@id'
  });
}
