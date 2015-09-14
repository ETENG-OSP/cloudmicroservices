angular
  .module('app', [
    'satellizer',
    'ui.router'
  ])
  .config(appConfig);

function appConfig($authProvider, $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $authProvider.loginUrl = '/admin/login' + window.location.search;
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html'
    });
}
