var Controller = require('./controller');

function factory(modelName, populates) {

  var resourceController = new Controller();

  console.log('controller create');

  resourceController.operation('find', function() {
    console.log('find invoke');
    find.$inject = [modelName];
    return this.realm(find);

    function find(Model) {
      var query = Model.find();
      if (Array.isArray(populates)) {
        populates.forEach(function(populate) {
          query.populate(populate);
        });
      }
      return query;
    }
  });

  createOperation.$inject = ['data'];
  resourceController.operation('create', createOperation);
  function createOperation(data) {
    create.$inject = [modelName];
    return this.realm(create);

    function create(Model) {
      console.log('create:', data);
      return Model.create(data);
    }
  }

  findOneOperation.$inject = ['id'];
  resourceController.operation('findOne', findOneOperation);
  function findOneOperation(id) {
    findOne.$inject = [modelName];
    return this.realm(findOne);

    function findOne(Model) {
      var query = Model.findOne(id);
      if (Array.isArray(populates)) {
        populates.forEach(function(populate) {
          query.populate(populate);
        });
      }
      return query;
    }
  }

  updateOperation.$inject = ['id', 'data'];
  resourceController.operation('update', updateOperation);
  function updateOperation(id, data) {
    update.$inject = [modelName];
    return this.realm(update);

    function update(Model) {
      return Model.update(id, data);
    }
  }

  destroyOperation.$inject = ['id'];
  resourceController.operation('destroy', destroyOperation);
  function destroyOperation(id) {
    destroy.$inject = [modelName];
    return this.realm(destroy);

    function destroy(Model) {
      return Model.destroy(id);
    }
  }

  return resourceController;
}

module.exports = factory;
