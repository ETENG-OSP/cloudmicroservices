function roleConfig(nga, admin) {
  var role = admin.getEntity('roles');
  role.baseApiUrl('http://localhost:3001/api/');

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
