angular
  .module('app')
  .config(authConfig)
  .controller('AuthController', AuthController);

function authConfig($authProvider) {
  $authProvider.loginUrl = '//localhost:3003/auth/login';
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
  // return $http
  //   .post('//localhost:3003/auth/login', credentials)
  //   .then(function(response) {
  //     var requestToken = response.data.token;
  //
  //     return $q.all([
  //       $http.get(
  //         '//localhost:3004/api/features/1/applications/' + appId + '/token',
  //         {headers: {Authorization: 'Bearer ' + requestToken}}
  //       ),
  //       $http.get(
  //         '//localhost:3004/api/features/2/applications/' + appId + '/token',
  //         {headers: {Authorization: 'Bearer ' + requestToken}}
  //       )
  //     ]);
  //   })
  //   .then(function(results) {
  //     var userToken = results[0].data.token;
  //     var permissionToken = results[1].data.token;
  //     window.localStorage.setItem('usertoken', userToken);
  //     window.localStorage.setItem('permissiontoken', permissionToken);
  //     window.location.assign('/');
  //   });
};

AuthController.prototype.logout = function() {
};
