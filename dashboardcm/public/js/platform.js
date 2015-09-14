function platformConfig(nga, admin) {
  var platform = admin.getEntity('platforms');
  platform.baseApiUrl('http://localhost:3001/api/');
  platform
    .listView()
    .fields([
      nga.field('id'),
      nga.field('name'),
      nga.field('code')
    ])
    .listActions(['edit', 'delete']);

  platform
    .creationView()
    .fields([
      nga.field('name')
    ]);

  platform
    .editionView()
    .fields([
      nga.field('name'),
      nga.field('code')
    ]);
}
