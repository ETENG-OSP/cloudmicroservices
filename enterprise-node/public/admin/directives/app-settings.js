angular
  .module('app')
  .directive('appSettings', AppSettingsDirective)

function AppSettingsDirective() {
  return {
    link: link,
    templateUrl: 'partials/app-settings.html',
    controller: AppSettingsController,
    controllerAs: 'ctrl',
    scope: true
  };
}

function link(scope, element) {
}

function AppSettingsController($scope, $state, Application) {
  this.$scope = $scope;
  this.$state = $state;
  this.Application = Application;
  this.initialize();
}

AppSettingsController.prototype.initialize = function() {
  var $scope = this.$scope;
  var $state = this.$state;
  var Application = this.Application;
  var self = this;

  Application
    .get($state.params)
    .$promise
    .then(function(application) {
      $scope.application = application;
      application.features.forEach(function(feature) {

        feature.uninstall = function() {
          application
            .$uninstall({featureId: feature.id})
            .then(function() {
              self.initialize();
            });
        };

        Application.obtainToken({
          appId: application.id,
          featureId: feature.id
        }).$promise.then(function(data) {
          feature.token = data.token;
        });
      });
    });
};
