angular
  .module('app')
  .directive('userPanel', UserPanelDirective);

function UserPanelDirective() {
  return {
    templateUrl: 'partials/user-panel.html',
    controller: UserPanelController,
    controllerAs: 'ctrl'
  };
}

function UserPanelController($auth, $http, $scope) {
  this.$auth = $auth;
  this.$http = $http;
  this.$scope = $scope;
  this.initialize();
}

UserPanelController.prototype.initialize = function() {
  var $auth = this.$auth;
  var $http = this.$http;
  var $scope = this.$scope;
  $http
    .get('/api/user.json')
    .then(function(results) {
      $scope.displayName = results.data;
    });
};
