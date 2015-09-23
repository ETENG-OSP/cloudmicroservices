angular
  .module('app', [
    'ui.router',
    'ngResource',
    'satellizer'
  ])
  .constant('config', {
    registryHost: 'http://localhost:3003/',
    storeHost: 'http://localhost:3004/',
    permissionHost: 'http://localhost:3001/',
    authHost: 'http://localhost:3002/'
  })
  .config(appConfig)
  .run(appRun);

function appConfig($stateProvider, $urlRouterProvider, $authProvider) {

  $urlRouterProvider.otherwise('/');
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'views/home.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html'
    })

    .state('appsettings', {
      url: '/applications/:id',
      templateUrl: 'views/app-settings.html'
    })

    .state('featuresettings', {
      url: '/features/:id',
      templateUrl: 'partials/feature-settings.html'
    });

}

function appRun($rootScope) {
  $rootScope.config = config;
}
