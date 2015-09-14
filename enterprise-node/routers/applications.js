var router = require('express').Router();
var ensureAuthenticated = require('../middlewares/ensure-authenticated');
var appCtrl = require('../controllers/application-neo');

router
  .route('/applications')
  .get(ensureAuthenticated, function(req, res) {
    appCtrl
      .find({owner: req.userId})
      .then(function(entities) {
        return res.json(entities);
      });
  })
  .post(ensureAuthenticated, function(req, res) {
    var data = req.body;
    data.owner = req.userId;
    appCtrl
      .create(data)
      .then(function(entity) {
        return res.json(entity);
      });
  });

router
  .route('/applications/:id')
  .get(function(req, res) {
    appCtrl
      .findOne(req.params.id)
      .then(function(entity) {
        res.json(entity);
      });
  })
  .delete(ensureAuthenticated, function(req, res) {
    appCtrl
      .destroy(req.params.id)
      .then(function() {
        res.json('ok');
      });
  })
  .put(function(req, res) {
    appCtrl
      .update(req.body)
      .then(function(entity) {
        res.json(entity);
      });
  });

router
  .route('/applications/:appId/features/:featureId')
  .delete(function(req, res) {
    appCtrl
      .removeFeature(req.params.appId, req.params.featureId)
      .then(function(application) {
        res.json(application);
      });
  })
  .post(function(req, res) {
    appCtrl
      .addFeature(req.params.appId, req.params.featureId)
      .then(function(application) {
        res.json(application);
      });
  });

module.exports = router;
