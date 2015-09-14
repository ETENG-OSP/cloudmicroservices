angular
  .module('app')
  .directive('signup', SignupDirective);

function SignupDirective() {
  return {
    templateUrl: 'partials/signup.html'
  };
}
