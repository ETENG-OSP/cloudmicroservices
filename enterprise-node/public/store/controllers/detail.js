angular
  .module('app')
  .controller('DetailController', DetailController);

function DetailController(Feature, $scope, $state, $modal) {
  this.Feature = Feature;
  this.$scope = $scope;
  this.$state = $state;
  this.$modal = $modal;
  this.initialize();
}

DetailController.prototype.initialize = function() {
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

DetailController.prototype.install = function() {
  var $state = this.$state;
  var $modal = this.$modal;
  console.log($state.params.id);

  var modelInstance = $modal.open({
    templateUrl: 'partials/install.html'
  });
};
