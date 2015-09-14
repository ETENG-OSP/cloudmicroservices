angular
  .module('orders', ['ui.router'])
  .config(orderConfig);

function orderConfig($stateProvider) {

  $stateProvider
    .state('orders', {
      url: '/orders',
      templateUrl: 'views/orders.html'
    });

}
