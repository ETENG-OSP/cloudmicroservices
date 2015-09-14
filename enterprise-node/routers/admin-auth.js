var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var router = require('express').Router();
var createJWT = require('../utils/create-jwt');

var adminCtrl = require('../controllers/administrator-neo');

var ensureAuthenticated = require('../middlewares/ensure-authenticated');

var codebase = {};

router.put('/refresh', ensureAuthenticated, function(req, res) {
  var token = createJWT({
    id: req.userId
  });
  res.json({
    token: token
  });
});

router.get('/token', function(req, res) {
  if (codebase[req.query.code]) {
    return res.json({
      token: codebase[req.query.code]
    });
  }

  return res.status(404).json({
    message: 'not found'
  });
});

router.post('/auth/login', function(req, res) {
  var userData = req.body;
  console.log(userData);

  adminCtrl
    .login(userData)
    .then(function(reply) {
      res.json(reply);
    })
    .catch(function(err) {
      console.log(err);
      res.status(401).json({
        message: err.message
      });
    });

  // login(userData)
  //   .then(function(token) {
  //     if (req.query.callback) {
  //       var callbackUrl = decodeURIComponent(req.query.callback);
  //       console.log('callback:', callbackUrl);
  //       var code = new Buffer(uuid.v4()).toString('base64');
  //       codebase[code] = token;
  //       setTimeout(function() {
  //         delete codebase[code];
  //       }, 60000);
  //       var redirUrl = callbackUrl + '?code=' + code;
  //       return res.redirect(302, redirUrl);
  //     }
  //     return res.json({token: token});
  //   })
  //   .catch(function(err) {
  //     console.log('> login failed:', err);
  //     return res.status(401).json(err);
  //   });
});

router.post('/auth/signup', function(req, res) {
  var userData = req.body;

  adminCtrl
    .signup(userData)
    .then(function(reply) {
      res.json(reply);
    });

  // signup(userData)
  //   .then(function(token) {
  //     console.log('> signup success:', userData);
  //     return res.json({token: token});
  //   })
  //   .catch(function(err) {
  //     switch (err.code) {
  //     case 'ALREADY_SIGNUP':
  //       res.status(409);
  //       break;
  //     default:
  //       res.status(500);
  //     }
  //     console.error('> signup failed:', err);
  //     return res.json(err);
  //   });
});

router.get('/auth/admin/token', function(req, res) {
  adminCtrl
    .getAdminToken(req.query.requestToken)
    .then(function(token) {
      res.json({
        token: token
      });
    });
});

module.exports = router;
