var router = require('express').Router();
var RoleController = require('../controllers/role');

var ensureAuthenticated = require('../middlewares/ensure-authenticated');

var roleCtrl = new RoleController();

router
  .route('/roles')
  .get(function(req, res) {
    roleCtrl
      .application(req.appID)
      .getAll()
      .then(function(roles) {
        res.json(roles);
      });
  })
  .post(function(req, res) {
    roleCtrl
      .application(req.appID)
      .create(req.body)
      .then(function(role) {
        res.json(role);
      });
  })

router
  .route('/roles/:id')
  .get(function(req, res) {
    roleCtrl
      .getById(req.params.id)
      .then(function(role) {
        res.json(role);
      });
  })
  .delete(function(req, res) {
    roleCtrl
      .removeById(req.params.id)
      .then(function() {
        res.json('ok');
      });
  })
  .put(function(req, res) {
    roleCtrl
      .update(req.body)
      .then(function(role) {
        res.json(role);
      });
  });

module.exports = router;
