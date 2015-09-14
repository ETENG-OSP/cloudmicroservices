function roleConfig(nga, admin, config) {
  var role = admin.getEntity('roles');
  role.baseApiUrl(config.permissionHost + 'api/');

  role
    .listView()
    .fields([
      nga.field('id'),
      nga.field('name'),
      nga.field('code'),
      nga.field('permissions', 'reference_many')
        .targetEntity(admin.getEntity('permissions'))
        .targetField(nga.field('name'))
    ])
    .listActions(['edit', 'delete']);

  role
    .creationView()
    .fields([
      nga.field('name')
    ]);

  role
    .editionView()
    .fields([
      nga.field('name'),
      nga.field('code'),
      nga.field('permissions', 'reference_many')
        .targetEntity(admin.getEntity('permissions'))
        .targetField(nga.field('name')),
      nga.field('users', 'reference_many')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('username'))
    ]);
}
