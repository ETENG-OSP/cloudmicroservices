angular
  .module('app')
  .directive('login', LoginDirective);

function LoginDirective() {
  return {
    templateUrl: 'partials/login.html'
  };
}
