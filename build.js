var pp = require('preprocess');

var context = {
  //DEV: true,
};

pp.preprocessFileSync(
  'authcm/lib/config.template.js',
  'authcm/lib/config.js',
  context
);
pp.preprocessFileSync(
  'permissioncm/lib/config.template.js',
  'permissioncm/lib/config.js',
  context
);

pp.preprocessFileSync(
  'dashboardcm/public/index.template.html',
  'dashboardcm/public/index.html',
  context
);

pp.preprocessFileSync(
  'enterprise-node/public/admin/js/app.template.js',
  'enterprise-node/public/admin/js/app.js',
  context
);

pp.preprocessFileSync(
  'enterprise-node/public/admin/partials/app-settings.template.html',
  'enterprise-node/public/admin/partials/app-settings.html',
  context
);

pp.preprocessFileSync(
  'enterprise-node/public/store/js/app.template.js',
  'enterprise-node/public/store/js/app.js',
  context
);
