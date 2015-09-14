angular
  .module('balance', ['ui.router'])
  .config(balanceConfig);

function balanceConfig($stateProvider) {

  $stateProvider
    .state('balance', {
      url: '/balance',
      templateUrl: 'views/compartment.html'
    });

}
