angular
  .module('app')
  .directive('appList', AppListDirective)

function AppListDirective() {
  return {
    templateUrl: 'partials/app-list.html',
    controller: AppListController,
    controllerAs: 'ctrl',
    scope: true
  };
}

function AppListController($scope, Application) {
  this.$scope = $scope;
  this.Application = Application;
  this.initialize();
}

AppListController.prototype.initialize = function() {
  var $scope = this.$scope;
  var Application = this.Application;
  $scope.apps = $scope.apps || [];
  Application.query().$promise.then(function(applications) {
    $scope.apps = applications;
  });
};

AppListController.prototype.createApp = function(data) {
  var self = this;
  var $scope = this.$scope;
  var Application = this.Application;
  var app = new Application(data);
  app
    .$save()
    .then(function() {
      self.initialize();
    });
};

AppListController.prototype.removeApp = function(app) {
  var self = this;
  var $scope = this.$scope;
  app
    .$remove()
    .then(function() {
      self.initialize();
    });
};
