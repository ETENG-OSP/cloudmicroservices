angular
  .module('permission', [
    'satellizer'
  ])
  .config(permissionModuleConfig)
  .directive('login', LoginDirecitve)
  .directive('permissions', PermissionDirective)
  .factory('acl', ACLFactory)
  .run(run);

function permissionModuleConfig($authProvider) {
  // var tokenName = $authProvider.tokenPrefix + '_' + $authProvider.tokenName;
}

function PermissionDirective() {
  return {
    templateUrl: function(elem, attrs) {
      return attrs.permissions || 'modules/permission/partials/permissions.tpl.html';
    },
    controller: PermissionDirectiveController,
    controllerAs: 'ctrl'
  };
}

/**
 * @ngInject
 */
function PermissionDirectiveController($scope, $auth, acl) {
  acl
    .getUsablePermissions()
    .then(function(permissions) {
      $scope.permissions = permissions;
    });
}

function LoginDirecitve() {
  return {
    templateUrl: function(elem, attrs) {
      return attrs.login || 'modules/permission/partials/login.tpl.html';
    },
    controller: LoginDirecitveController,
    controllerAs: '$etd',
    scope: {
      onSuccess: '&onsuccess',
      onFail: '&onfail'
    }
  };
}

/**
 * @ngInject
 */
function LoginDirecitveController($scope, $auth) {
  this.$scope = $scope;
  this.$auth = $auth;
}

LoginDirecitveController.prototype.login = function(credentials) {
  var $scope = this.$scope;
  var $auth = this.$auth;

  $auth
    .login(credentials)
    .then(function(result) {

      $scope.onSuccess(result);

    }, function() {

      $scope.onFail();

    });
};

/**
 * @ngInject
 */
function ACLFactory($http, $auth) {
  return new ACL($http, $auth);
}

function ACL($http, $auth) {
  this.$http = $http;
  this.$auth = $auth;
}

ACL.prototype.getCurrentUserID = function() {
  var $auth = this.$auth;
  return $auth.getPayload().sub;
};

ACL.prototype.refreshToken = function() {
  var $http = this.$http;
  var $auth = this.$auth;
  return $http
    .put(config.authServer + '/refresh')
    .then(function(results) {
      var token = results.data.token;
      $auth.setToken(token);
      return token;
    });
};

ACL.prototype.getUsablePermissions = function() {
  var $http = this.$http;
  console.log(config.permissionServer);
  return $http.get(config.permissionServer + '/api/permissions/usable')
    .then(function(result) {
      var tree = buildTree(result.data);
      return tree;
    });
};

function buildTree(data) {
  // indexing
  var indexed = data.reduce(function(memo, value) {
    value.nodes = [];
    memo[value.id] = value;
    return memo;
  }, {});

  // nested
  _.each(indexed, function(value, key) {
    var parent = value.parent;
    if (!parent) {
      return;
    }
    indexed[parent].nodes.push(value);
  });

  // filter non root
  return _.filter(indexed, function(value, key) {
    return !value.parent;
  });
}

/**
 * @ngInject
 */
function run($templateCache, $http, $auth) {
  // $templateCache.put('modules/permission/partials/login.tpl.html');

  var query = window.location.search.substr(1);
  var query = Qs.parse(query);
  var code = query.code;
  if (code) {
    $http
      .get(config.authServer + '/token', {params: {code: code}})
      .then(function(results) {
        $auth.setToken(results.data.token);
      })
      .finally(function() {
        delete query.code;
        window.location.search = Qs.stringify(query);
      });
  }
}
