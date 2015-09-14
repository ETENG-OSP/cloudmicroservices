angular
  .module('app')
  .controller('ApplicationController', ApplicationController);

function ApplicationController($http, $scope, $q, $auth) {
  this.$http = $http;
  this.$scope = $scope;
  this.$q = $q;
  this.$auth = $auth;
  this.initialize();
}

ApplicationController.prototype.initialize = function() {
  var $http = this.$http;
  var $scope = this.$scope;
  var $auth = this.$auth;
  $http
    .get('//localhost:3003/api/applications', {
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
  return $q.all([
    $http.get(
      '//localhost:3004/api/features/1/applications/' + application.id + '/token',
      {headers: {Authorization: 'Bearer ' + $auth.getToken()}}
    ),
    $http.get(
      '//localhost:3004/api/features/2/applications/' + application.id + '/token',
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
