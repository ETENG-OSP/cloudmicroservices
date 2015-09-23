var childProcess = require('child_process');

childProcess.fork('build', {cwd: 'enterprise-node/'});
childProcess.fork('build', {cwd: 'authcm/'});
childProcess.fork('build', {cwd: 'permissioncm/'});
childProcess.fork('build', {cwd: 'dashboardcm/'});
