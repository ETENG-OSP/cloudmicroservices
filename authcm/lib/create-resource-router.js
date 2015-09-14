var express = require('express');
function createResourceRouter(resourceName) {

  var router = express.Router();
  var controller = require('../controllers/' + resourceName);

  router
    .route('/' + resourceName + 's')
    .get(function(req, res) {
      return controller
        .find(null, req.appId)
        .then(function(entities) {
          return res.json(entities);
        });
    })
    .post(function(req, res) {
      return controller
        .create(req.body, req.appId)
        .then(function(entity) {
          return res.json(entity);
        });
    });

  router
    .route('/' + resourceName + 's/:id')
    .get(function(req, res) {
      return controller
        .findOne(req.params.id, req.appId)
        .then(function(entity) {
          return res.json(entity);
        });
    })
    .delete(function(req, res) {
      return controller
        .destroy(req.params.id, req.appId)
        .then(function(entity) {
          return res.json(entity);
        });
    })
    .put(function(req, res) {
      return controller
        .update(req.params.id, req.body, req.appId)
        .then(function(entity) {
          return res.json(entity);
        });
    });

  return router;
}

module.exports = createResourceRouter;
