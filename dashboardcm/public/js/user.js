function userConfig(nga, admin, config) {
  var user = admin.getEntity('users');
  user.baseApiUrl(config.authHost + 'api/');
  user
    .listView()
    .fields([
      nga.field('id'),
      nga.field('username'),
      nga.field('roles', 'reference_many')
        .targetEntity(admin.getEntity('roles'))
        .targetField(nga.field('name'))
    ])
    .listActions(['edit', 'delete']);

  user
    .creationView()
    .fields([
      nga.field('username'),
      nga.field('password')
    ]);

  user
    .editionView()
    .fields([
      nga.field('username'),
      nga.field('password', 'password'),
      nga.field('roles', 'reference_many')
        .targetEntity(admin.getEntity('roles'))
        .targetField(nga.field('name'))
    ]);
}
