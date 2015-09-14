angular
  .module('app')
  .controller('TestController', TestController);

function TestController($http) {
  this.$http = $http;
}

TestController.prototype.test = function() {
  var $http = this.$http;
  $http
    .get('/test' + window.location.search)
    .success(function(data) {
      alert(JSON.stringify(data));
    })
    .error(function(err) {
      alert(JSON.stringify(err))
    });
}

TestController.prototype.testAdmin = function() {
  var $http = this.$http;
  $http
    .get('/test/admin' + window.location.search)
    .success(function(data) {
      alert(JSON.stringify(data));
    })
    .error(function(err) {
      alert(JSON.stringify(err));
    });
}
