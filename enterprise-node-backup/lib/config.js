var config = {
  secret: 'secret',
  expiresInMinutes: 60 * 24 * 7,
  authServer: 'http://localhost:3002',
  permissionServer: 'http://localhost:3001',
  demoServer: 'http://localhost:3000',
  adminServer: 'http://localhost:3003'
};

module.exports = config;
