angular
  .module('app')
  .controller('FeatureController', FeatureController);

function FeatureController(Feature, $scope, $state) {
  this.Feature = Feature;
  this.$scope = $scope;
  this.$state = $state;
  this.initialize();
}

FeatureController.prototype.initialize = function() {
  var Feature = this.Feature;
  var $state = this.$state;
  var $scope = this.$scope;

  Feature
    .get($state.params)
    .$promise
    .then(function(feature) {
      $scope.feature = feature;
    });
};
