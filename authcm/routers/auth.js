var router = require('express').Router();
var userCtrl = require('../controllers/user');

router
  .route('/auth/login')
  .post(function(req, res) {
    userCtrl
      .login(req.body, req.appId)
      .then(function(reply) {
        res.json(reply);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

router
  .route('/auth/signup')
  .post(function(req, res) {
    userCtrl
      .signup(req.body, req.appId)
      .then(function(reply) {
        res.json(reply);
      }).catch(function(err) {
        console.log(arguments);
        res.status(401).json(err);
      });
  });

module.exports = router;
