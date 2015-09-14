angular
  .module('app', [
    'ng-admin',
    'satellizer'
  ])
  .config(appConfig)
  .run(appRun);

function appConfig(NgAdminConfigurationProvider) {
  var pathArray = window.location.pathname.split('/');
  var appID = pathArray[2];
  var nga = NgAdminConfigurationProvider;
  var admin = nga.application('应用管理')
    .baseApiUrl('/app/' + appID + '/api/');

  var user = nga.entity('users');
  var role = nga.entity('roles');
  var permission = nga.entity('permissions');
  var platform = nga.entity('platforms');

  admin.addEntity(user);
  admin.addEntity(role);
  admin.addEntity(permission);
  admin.addEntity(platform);

  admin
    .menu()
    .getChildByTitle('Users')
    .title('用户')
    .icon('<span class="glyphicon glyphicon-user"></span>');

  admin
    .menu()
    .getChildByTitle('Roles')
    .title('角色')
    .icon('<span class="glyphicon glyphicon-list-alt"></span>');

  admin
    .menu()
    .getChildByTitle('Permissions')
    .title('权限')
    .icon('<span class="glyphicon glyphicon-lock"></span>');

  admin
    .menu()
    .getChildByTitle('Platforms')
    .title('平台')
    .icon('<span class="glyphicon glyphicon-phone"></span>');


  // ================ user =================

  user
    .listView()
    .title('用户清单')
    .fields([
      nga.field('id').label('ID'),
      nga.field('displayname').label('显示名'),
      nga.field('username').label('登录名'),
      nga.field('roles', 'reference_many').label('角色')
        .targetEntity(role)
        .targetField(nga.field('name'))
    ])
    .listActions(['show', 'edit', 'delete']);

  user
    .creationView()
    .title('建立新用户')
    .fields([
      nga.field('username').label('登录名'),
      nga.field('password').label('密码')
    ]);

  user
    .editionView()
    .title('编辑用户 #{{entry.values.id}} "{{entry.values.username}}"')
    .fields([
      nga.field('displayname').label('显示名称'),
      nga.field('password', 'password').label('密码'),
      nga.field('roles', 'reference_many').label('角色')
        .targetEntity(role)
        .targetField(nga.field('name'))
    ]);

  user
    .showView()
    .title('用户详情 #{{entry.values.id}}')
    .fields([
      nga.field('username').label('登录名'),
      nga.field('displayname').label('显示名称'),
      nga.field('roles', 'reference_many').label('角色')
        .targetEntity(role)
        .targetField(nga.field('name')),
      nga.field('permissions', 'referenced_list').label('拥有权限')
        .targetEntity(permission)
        .targetReferenceField('user_id')
        .targetFields([
          nga.field('id'),
          nga.field('name'),
          nga.field('platform', 'reference')
            .targetEntity(platform)
        ])
    ]);

  // ================ role =================

  role
    .listView()
    .title('角色清单')
    .fields([
      nga.field('id').label('ID'),
      nga.field('name').label('名称')
    ])
    .listActions(['edit', 'delete']);

  role
    .creationView()
    .title('建立新角色')
    .fields([
      nga.field('name')
    ]);

  role
    .editionView()
    .title('编辑角色 #{{entry.values.id}}')
    .fields([
      nga.field('name').label('名称'),
      nga.field('permissions', 'reference_many').label('权限')
        .targetEntity(permission)
        .targetField(nga.field('name')),
      nga.field('users', 'reference_many').label('用户')
        .targetEntity(user)
        .targetField(nga.field('username'))
    ]);

  // ================ permission =================

  permission
    .listView()
    .title('权限清单')
    .fields([
      nga.field('id').label('ID'),
      nga.field('name').label('名称'),
      nga.field('url').label('URL'),
      nga.field('parent', 'reference').label('父级节点')
        .targetEntity(permission)
        .targetField(nga.field('name')),
      nga.field('platform', 'reference').label('平台')
        .targetEntity(platform)
        .targetField(nga.field('name')),
      nga.field('roles', 'reference_many').label('角色')
        .targetEntity(role)
        .targetField(nga.field('name'))
    ])
    .listActions(['edit', 'delete']);

  permission
    .creationView()
    .title('建立新权限')
    .fields([
      nga.field('name').label('名称')
    ]);

  permission
    .editionView()
    .title('编辑权限 #{{entry.values.id}}')
    .fields([
      nga.field('name').label('名称'),
      nga.field('url'),
      nga.field('parent', 'reference').label('父级节点')
        .targetEntity(permission)
        .targetField(nga.field('name')),
      nga.field('platform', 'reference').label('平台')
        .targetEntity(platform)
        .targetField(nga.field('name')),
      nga.field('roles', 'reference_many').label('角色')
        .targetEntity(role)
        .targetField(nga.field('name')),
      nga.field('meta', 'json').label('元数据')
    ]);

  // ================ platform =================

  platform
    .listView()
    .title('平台清单')
    .fields([
      nga.field('id').label('ID'),
      nga.field('name').label('名称')
    ])
    .listActions(['edit', 'delete']);

  platform
    .creationView()
    .title('建立新平台')
    .fields([
      nga.field('name').label('名称')
    ]);

  platform
    .editionView()
    .title('编辑平台 #{{entry.values.id}}')
    .fields([
      nga.field('name')
    ]);

  nga.configure(admin);
}

function appRun($rootScope, $auth, $http) {
  var query = window.location.search.substr(1);
  var query = Qs.parse(query);
  var code = query.code;
  if (code) {
    $http
      .get(config.authServer + '/admin/token', {params: {code: code}})
      .then(function(results) {
        $auth.setToken(results.data.token);
      })
      .finally(function() {
        delete query.code;
        window.location.search = Qs.stringify(query);
      });
  }

  if (!$auth.isAuthenticated()) {
    window.location.assign([
      config.authServer,
      '/admin-login.html?redirect=',
      encodeURIComponent(window.location.href)
    ].join(''));
  }
}
