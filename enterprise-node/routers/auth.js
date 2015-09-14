var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var router = require('express').Router();
var createJWT = require('../utils/create-jwt');
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

  login(userData)
    .then(function(results) {
      if (req.query.callback) {
        var callbackUrl = decodeURIComponent(req.query.callback);
        console.log('callback:', callbackUrl);
        var code = new Buffer(uuid.v4()).toString('base64');
        codebase[code] = results.token;
        setTimeout(function() {
          delete codebase[code];
        }, 60000);
        var redirUrl = callbackUrl + '?code=' + code;
        return res.redirect(302, redirUrl);
      }
      return res.json(results);
    })
    .catch(function(err) {
      console.log('> login failed:', err);
      return res.status(401).json(err);
    });
});

router.post('/auth/signup', function(req, res) {
  var userData = req.body;

  signup(userData, req.appID)
    .then(function(token) {
      console.log('> signup success:', userData);
      return res.json({token: token});
    })
    .catch(function(err) {
      switch (err.code) {
      case 'ALREADY_SIGNUP':
        res.status(409);
        break;
      default:
        res.status(500);
      }
      console.error('> signup failed:', err);
      return res.json(err);
    });
});

module.exports = router;
