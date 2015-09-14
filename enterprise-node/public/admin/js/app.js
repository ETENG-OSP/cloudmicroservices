angular
  .module('app', [
    'ui.router',
    'ngResource',
    'satellizer'
  ])
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

    // .state('logout', {
    //   url: '/logout',
    //   controllers: 'AuthController'
    // });

}

function appRun($rootScope) {
  $rootScope.config = config;
}
