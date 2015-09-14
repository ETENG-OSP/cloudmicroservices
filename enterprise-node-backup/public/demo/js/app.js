angular.module('business', [
  'orders',
  'balance',
]);

angular
  .module('app', [
    'business',
    'permission',
    'ui.router'
  ])
  .config(appConfig)
  .controller('AppController', AppController)
  .run(appRun);

function appConfig($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = config.authServer + '/auth/login';

  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'views/home.html'
  });

}

function AppController(acl) {
  this.acl = acl;
  console.log('app loaded');
}

AppController.prototype.refresh = function() {
  var acl = this.acl;
  acl
    .refreshToken()
    .then(function(results) {
      console.log(results);
    });
};

AppController.prototype.loginSuccess = function(data) {
  console.log('login success:', data);
};

function appRun($rootScope) {
  $rootScope.config = config;
}
