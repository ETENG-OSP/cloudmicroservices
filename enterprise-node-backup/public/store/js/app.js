angular
  .module('app', [
    'ngResource',
    'satellizer',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(appConfig);

function appConfig($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = '//localhost:3003/auth/login';
  $authProvider.signupUrl = '//localhost:3003/auth/signup';

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
