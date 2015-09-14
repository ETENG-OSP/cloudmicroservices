angular
  .module('app')
  .directive('featureList', FeatureListDirective);

function FeatureListDirective() {
  return {
    templateUrl: 'partials/feature-list.html',
    controller: FeatureListController,
    controllerAs: 'ctrl',
    scope: true
  };
}

function FeatureListController($scope, Feature) {
  this.$scope = $scope;
  this.Model = Feature;
  this.initialize();
}

FeatureListController.prototype.initialize = function() {
  var $scope = this.$scope;
  var Model = this.Model;
  $scope.entities = $scope.entities || [];
  Model
    .query()
    .$promise
    .then(function(entities) {
      $scope.entities = entities;
    });
};

FeatureListController.prototype.create = function(data) {
  var self = this;
  var $scope = this.$scope;
  var Model = this.Model;
  console.log(data);
  var entity = new Model(data);
  entity
    .$save()
    .then(function() {
      self.initialize();
    });
};

FeatureListController.prototype.remove = function(entity) {
  var self = this;
  var $scope = this.$scope;
  entity
    .$remove()
    .then(function() {
      self.initialize();
    });
};
