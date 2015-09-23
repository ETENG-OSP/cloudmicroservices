var childProcess = require('child_process');

childProcess.fork('startup', {cwd: 'enterprise-node/'});
childProcess.fork('startup', {cwd: 'authcm/'});
childProcess.fork('startup', {cwd: 'permissioncm/'});
childProcess.fork('startup', {cwd: 'dashboardcm/'});
