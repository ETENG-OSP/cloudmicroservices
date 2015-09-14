angular
  .module('app')
  .controller('ApplicationListController', ApplicationListController)

function ApplicationListController($scope, $state, Application) {
  this.$scope = $scope;
  this.$state = $state;
  this.Model = Application;
  this.initialize();
}

ApplicationListController.prototype.initialize = function() {
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

ApplicationListController.prototype.create = function(data) {
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

ApplicationListController.prototype.remove = function(entity) {
  var self = this;
  var $scope = this.$scope;
  entity
    .$remove()
    .then(function() {
      self.initialize();
    });
};

ApplicationListController.prototype.installTo = function(app) {
  var $state = this.$state;
  app
    .$install({
      featureId: $state.params.id
    })
    .then(function() {
      console.log('ok');
    });
}
