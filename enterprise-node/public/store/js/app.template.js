angular
  .module('app', [
    'ngResource',
    'satellizer',
    'ui.router',
    'ui.bootstrap'
  ])
  .constant('config', {
    /* @ifdef DEV **
    registryHost: 'http://localhost:3003/',
    storeHost: 'http://localhost:3004/',
    permissionHost: 'http://localhost:3001/',
    authHost: 'http://localhost:3002/'
    /* @endif */

    /* @ifndef DEV */
    registryHost: 'http://192.168.0.35:3003/',
    storeHost: 'http://192.168.0.35:3004/',
    permissionHost: 'http://192.168.0.35:3001/',
    authHost: 'http://192.168.0.35:3002/'
    /* @endif */
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
