angular
  .module('app')
  .controller('ApplicationController', ApplicationController);

function ApplicationController($http, $scope, $q, $auth, config) {
  this.$http = $http;
  this.$scope = $scope;
  this.$q = $q;
  this.$auth = $auth;
  this.config = config;
  this.initialize();
}

ApplicationController.prototype.initialize = function() {
  var $http = this.$http;
  var $scope = this.$scope;
  var $auth = this.$auth;
  var config = this.config;
  $http
    .get(config.registryHost + 'api/applications', {
      headers: {Authorization: 'Bearer ' + $auth.getToken()}
    })
    .then(function(res) {
      console.log(res);
      $scope.entities = res.data;
    });
};

ApplicationController.prototype.choose = function(application) {
  var $http = this.$http;
  var $q = this.$q;
  var $auth = this.$auth;
  var config = this.config;
  return $q.all([
    $http.get(
      config.storeHost +
        'api/features/1/applications/' +
        application.id +
        '/token',
      {headers: {Authorization: 'Bearer ' + $auth.getToken()}}
    ),
    $http.get(
      config.storeHost +
        'api/features/2/applications/' +
        application.id +
        '/token',
      {headers: {Authorization: 'Bearer ' + $auth.getToken()}}
    )
  ]).then(function(results) {
    var userToken = results[0].data.token;
    var permissionToken = results[1].data.token;
    window.localStorage.setItem('appname', application.name);
    window.localStorage.setItem('usertoken', userToken);
    window.localStorage.setItem('permissiontoken', permissionToken);
    window.location.assign('/');
  });
};
