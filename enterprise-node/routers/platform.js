var router = require('express').Router();
var PlatformController = require('../controllers/platform');

var ctrl = new PlatformController();

router
  .route('/platforms')
  .get(function(req, res) {
    ctrl
      .application(req.appID)
      .getAll()
      .then(function(instances) {
          res.json(instances);
        });
  })
  .post(function(req, res) {
    ctrl
      .application(req.appID)
      .create(req.body)
      .then(function(instance) {
        res.json(instance);
      });
  });

router
  .route('/platforms/:id')
  .get(function(req, res) {
    ctrl
      .getById(req.params.id)
      .then(function(instance) {
        return res.json(instance);
      });
  })
  .delete(function(req, res) {
    ctrl
      .removeById(req.params.id)
      .then(function() {
        res.json('ok');
      });
  })
  .put(function(req, res) {
    ctrl
      .update(req.body)
      .then(function(instance) {
        return res.json(instance);
      });
  });

module.exports = router;
