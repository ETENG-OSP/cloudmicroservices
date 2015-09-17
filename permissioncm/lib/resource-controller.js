var _ = require('underscore');
var collections = require('./collections');

function resourceController(resourceName, populates) {

  return {
    find: find,
    findOne: findOne,
    create: create,
    update: update,
    destroy: destroy
  };

  function find(req, res, next) {

    var args;
    var appId = req.cm.appId;

    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        var query = Model.find(args);
        if (Array.isArray(populates)) {
          populates.forEach(function(populate) {
            query.populate(populate);
          });
        }
        return query;
      })
      .then(function(entities) {
        return res.json(entities);
      })
      .catch(function(err) {
        return res.status(500).json(err);
      });
  }

  function findOne(req, res, next) {

    var id = req.swagger.params.id.value;
    var appId = req.cm.appId;

    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        var query = Model.findOne(id);
        if (Array.isArray(populates)) {
          populates.forEach(function(populate) {
            query.populate(populate);
          });
        }
        return query;
      })
      .then(function(entity) {
        return res.json(entity);
      })
      .catch(function(err) {
        return res.status(500).json(err);
      });
  }

  function create(req, res, next) {

    var data = req.swagger.params.data.value;
    var appId = req.cm.appId;

    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        return Model.create(data);
      })
      .then(function(entity) {
        return res.json(entity);
      })
      .catch(function(err) {
        return res.status(500).json(err);
      });
  }

  function update(req, res, next) {

    var id = req.swagger.params.id.value;
    var data = req.swagger.params.data.value;
    var appId = req.cm.appId;

    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        return Model.update(id, data);
      })
      .then(function(entity) {
        return res.json(entity);
      })
      .catch(function(err) {
        return res.status(500).json(err);
      });
  }

  function destroy(req, res, next) {

    var id = req.swagger.params.id.value;
    var appId = req.cm.appId;

    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        return Model.destroy(id);
      })
      .then(function(entity) {
        return res.json(entity);
      })
      .catch(function(err) {
        return res.status(500).json(err);
      });
  }
}

module.exports = resourceController;
