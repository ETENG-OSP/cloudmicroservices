var router = require('express').Router();
var ensureAuthenticated = require('../middlewares/ensure-authenticated');
var featureCtrl = require('../controllers/feature-neo');

router
  .route('/features')
  .get(ensureAuthenticated, function(req, res) {
    if (req.query.all) {
      return featureCtrl
        .find({owner: req.userId})
        .then(function(entities) {
          return res.json(entities);
        });
    }

    return featureCtrl
      .find({owner: req.userId})
      .then(function(entities) {
        return res.json(entities);
      });
  })
  .post(ensureAuthenticated, function(req, res) {
    var data = req.body;
    data.owner = req.userId;
    featureCtrl
      .create(data)
      .then(function(entity) {
        return res.json(entity);
      });
  });

router
  .route('/features/:id')
  .get(function(req, res) {
    return featureCtrl
      .findOne(req.params)
      .then(function(entity) {
        return res.json(entity);
      });
  })
  .delete(function(req, res) {
    return featureCtrl
      .destroy(req.params.id)
      .then(function() {
        return res.json('ok');
      });
  })
  .put(function(req, res) {
    return featureCtrl
      .update(req.params.id, req.body)
      .then(function(feature) {
        return res.json(feature);
      });
  });

router
  .route('/features/:featureId/applications/:appId/token')
  .get(function(req, res) {
    return featureCtrl
      .generateToken(req.params.featureId, req.params.appId)
      .then(function(token) {
        res.json({
          token: token
        });
      });
  });

module.exports = router;
