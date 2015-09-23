var childProcess = require('child_process');

if (process.env.NODE_ENV === 'test') {

  childProcess.fork('startup', {cwd: 'enterprise-node/'});
  childProcess.fork('startup', ['--platform:secret=MjY5ZmM5Y2YtZWI0My00ZmY5LWIxNzQtZDk4NGY0MTdhZDUx'], {cwd: 'authcm/'});
  childProcess.fork('startup', ['--platform:secret=MDgxZGRhZGYtNzA3OS00ZGZjLWJkZGItYjcxMTc1YWJmMDAx'], {cwd: 'permissioncm/'});
  childProcess.fork('startup', {cwd: 'dashboardcm/'});

} else {

  childProcess.fork('startup', {cwd: 'enterprise-node/'});
  childProcess.fork('startup', {cwd: 'authcm/'});
  childProcess.fork('startup', {cwd: 'permissioncm/'});
  childProcess.fork('startup', {cwd: 'dashboardcm/'});

}
