var jwt = require('jsonwebtoken');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

function getToken(req) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    return token;
  }
  if (req.query.token) {
    return req.query.token;
  }
}

module.exports = function(config) {
  return {
    verify: verify,
    issuerCheck: issuerCheck,
    audienceCheck: audienceCheck,
    adminCheck: adminCheck,
    login: login
  };

  function verify(req, res, next) {
    var token = getToken(req);
    if (!token) {
      return res.status(401).json({
        message: 'no token'
      });
    }
    try {
      req.token = jwt.verify(token, config.secret);
      next();
    } catch (err) {
      res.status(401).json(err);
    }
  }

  function issuerCheck(req, res, next) {
    if (req.token.iss !== config.id) {
      return res.status(401).json({
        message: 'feature mismatch'
      });
    }
    next();
  }

  function audienceCheck(req, res, next) {
    if (!req.token.aud) {
      return res.status(401).json({
        message: 'application not found'
      });
    }
    req.appId = req.token.aud;
    next();
  }

  function adminCheck(req, res, next) {
    var scope = req.token.scope;
    if (!Array.isArray(scope) || scope.indexOf('admin') === -1) {
      return res.status(401).json({
        message: 'not admin'
      });
    }
    next();
  }

  function login(opts) {
    opts = opts || {};
    var router = express.Router();
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: false}));
    router
      .route('/admin/login')
      .post(verify, issuerCheck, audienceCheck, function(req, res) {

        var loginUrl = opts.loginUrl ||
          'http://localhost:3003/auth/admin/token';

        request.get(loginUrl, {
          qs: {
            requestToken: jwt.sign({
              username: req.body.username,
              password: req.body.password
            }, config.secret, {
              issuer: config.id,
              audience: req.appId
            })
          }
        }, function(err, response, body) {
          if (err) {
            return res.status(500).json(err);
          }
          if (response.statusCode !== 200) {
            return res.status(response.statusCode).json(body);
          }
          res.json(JSON.parse(body));
        });

      });
    return router;
  }
};
