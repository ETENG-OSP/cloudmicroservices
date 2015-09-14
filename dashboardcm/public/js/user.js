function userConfig(nga, admin) {
  var user = admin.getEntity('users');
  user.baseApiUrl('http://localhost:3002/api/');
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
      nga.field('password'),
      nga.field('roles', 'reference_many')
        .targetEntity(admin.getEntity('roles'))
        .targetField(nga.field('name'))
    ]);
}
