angular
  .module('app')
  .controller('FeatureController', FeatureController);

function FeatureController(Feature, $scope, $stateParams) {
  this.Feature = Feature;
  this.$scope = $scope;
  this.$stateParams = $stateParams;
  this.initialize();
}

FeatureController.prototype.initialize = function() {
  var $scope = this.$scope;
  var Feature = this.Feature;
  Feature
    .query()
    .$promise
    .then(function(features) {
      $scope.features = features;
    });
};

FeatureController.prototype.install = function() {
  var $stateParams = this.$stateParams;
  console.log($stateParams.id);
};
