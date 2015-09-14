angular
  .module('app')
  .controller('AuthController', AuthController);

function AuthController($auth, $state) {
  this.$auth = $auth;
  this.$state = $state;
}

AuthController.prototype.getCurrentUser = function() {
  var $auth = this.$auth;
  var payload = $auth.getPayload();
  return payload.sub;
};

AuthController.prototype.isAuthenticated = function() {
  var $auth = this.$auth;
  return $auth.isAuthenticated();
};

AuthController.prototype.login = function(credentials) {
  var $auth = this.$auth;
  var $state = this.$state;
  return $auth
    .login(credentials)
    .then(function() {
      $state.go('home');
    });
};

AuthController.prototype.logout = function() {
  var $auth = this.$auth;
  var $state = this.$state;
  return $auth
    .logout()
    .then(function() {
      $state.go('home');
    });
};

AuthController.prototype.signup = function(credentials) {
  var $auth = this.$auth;
  var $state = this.$state;
  return $auth
    .signup(credentials)
    .then(function() {
      return $auth.login(credentials)
    })
    .then(function() {
      $state.go('home');
    });
};
