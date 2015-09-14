angular
  .module('app')
  .config(authConfig)
  .controller('AuthController', AuthController);

function authConfig($authProvider, config) {
  $authProvider.loginUrl = config.registryHost + 'auth/login';
  $authProvider.httpInterceptor = false;
}

function AuthController($http, $q, $auth, $location) {
  this.$q = $q;
  this.$http = $http;
  this.$auth = $auth;
  this.$location = $location;
}

AuthController.prototype.login = function(credentials) {
  var $http = this.$http;
  var $location = this.$location;
  var $auth = this.$auth;

  return $auth
    .login(credentials)
    .then(function() {
      $location.path('/choose');
    });
};

AuthController.prototype.logout = function() {
};
