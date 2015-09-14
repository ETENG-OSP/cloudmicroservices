angular
  .module('app', [
    'ngResource',
    'satellizer',
    'ui.router',
    'ui.bootstrap'
  ])
  .constant('config', {
    registryHost: 'http://localhost:3003/'
  })
  .config(appConfig);

function appConfig($stateProvider, $urlRouterProvider, $authProvider, config) {

  $authProvider.loginUrl = config.registryHost + 'auth/login';
  $authProvider.signupUrl = config.registryHost + 'auth/signup';

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'views/home.html'
    })

    .state('detail', {
      url: '/detail/:id',
      templateUrl: 'views/detail.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html'
    });

}
