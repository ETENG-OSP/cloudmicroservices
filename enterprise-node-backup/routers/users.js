var router = require('express').Router();
var UserController = require('../controllers/user');

var ctrl = new UserController();

router.route('/users')

  .get(function(req, res, next) {
    ctrl
      .application(req.appID)
      .getAll()
      .then(function(users) {
        return res.json(users);
      });
  })

  .post(function(req, res, next) {
    var userData = req.body;
    UserController
      .signup(userData, req.appID)
      .then(function(user) {
        return res.json(user);
      })
      .catch(function(err) {
        next(err);
        // switch (err.code) {
        // case 'ALREADY_SIGNUP':
        //   res.status(409);
        //   break;
        // default:
        //   res.status(500);
        // }
        // console.error('> signup failed:', err);
        // return res.json(err);
      });
  });

router.route('/users/:id')

  .get(function(req, res, next) {
    ctrl
      .getById(req.params.id)
      .then(function(user) {
        return res.json(user);
      });
  })

  .put(function(req, res, next) {
    ctrl
      .update(req.body)
      .then(function(user) {
        return res.json(user);
      });
  })

  .delete(function(req, res, next) {
    ctrl
      .removeById(req.params.id)
      .then(function(user) {
        return res.json(user);
      });
  });

module.exports = router;
