var _ = require('underscore');
var collections = require('./collections');

function createResourceController(resourceName, populates) {

  return {
    find: find,
    findOne: findOne,
    create: create,
    update: update,
    destroy: destroy
  };

  function find(args, appId) {
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
      });
  }

  function findOne(args, appId) {
    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        var query = Model.findOne(args);
        if (Array.isArray(populates)) {
          populates.forEach(function(populate) {
            query.populate(populate);
          });
        }
        return query;
      });
  }

  function create(args, appId) {
    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        return Model.create(args);
      });
  }

  function update(id, args, appId) {
    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        return Model.update(id, args);
      });
  }

  function destroy(args, appId) {
    return collections(appId)
      .get(resourceName)
      .then(function(Model) {
        return Model.destroy(args);
      });
  }
}

module.exports = createResourceController;
