'use strict';

var _ = require('underscore');

/* jshint esnext: true */
class BaseController {

  administrator(adminId) {
    this.adminId = adminId;
    return this;
  }

  application(appId) {
    this.appId = appId;
    return this;
  }

  create(data) {
    var Model = this.Model;
    if (this.appId) {
      data.application = this.appId;
    }

    if (this.adminId) {
      data.administrator = this.adminId;
    }

    return Model
      .forge(data)
      .save()
      .then(function(instance) {
        return instance.toJSON();
      });
  }

  getById(id) {
    var Model = this.Model;
    var relations = this.related;
    var options = {};
    if (relations) {
      options.withRelated = Object.keys(relations);
    }

    return Model
      .forge({id: id})
      .fetch(options)
      .then(function(instance) {
        if (!instance) {
          return;
        }

        var result = instance.toJSON();

        _.each(relations, function(RelatedModel, related) {
          result[related] = result[related].map(function(relatedInstance) {
            return relatedInstance.id;
          });
        });

        return result;
      });
  }

  removeById(id) {
    var Model = this.Model;

    return Model
      .forge({id: id})
      .destroy();
  }

  getAll() {
    var Model = this.Model;
    var relations = this.related;
    var options = {};
    if (relations) {
      options.withRelated = Object.keys(relations);
    }

    var where = {};

    if (this.appId) {
      where.application = this.appId;
    }

    if (this.adminId) {
      where.administrator = this.adminId;
    }

    return Model
      .where(where)
      .fetchAll(options)
      .then(function(instances) {
        return instances.map(function(instance) {
          var result = instance.toJSON();

          _.each(relations, function(RelatedModel, related) {
            result[related] = result[related].map(function(relatedInstance) {
              return relatedInstance.id;
            });
          });

          return result;
        });
      });
  }

  update(data) {
    var Model = this.Model;
    var relations = this.related;

    var relatedData = {};

    _.each(relations, function(RelatedModel, related) {
      if (!data[related]) {
        return;
      }
      relatedData[related] = {
        model: RelatedModel,
        ids: data[related]
      };
      delete data[related];
    });

    return Model
      .forge(data)
      .save()
      .then(function(instance) {
        if (Object.keys(relatedData).length === 0) {
          return;
        }

        return Promise.all(_.map(relatedData, function(values, related) {
          return instance[related]()
            .detach()
            .then(function() {
              return instance
                .related(related)
                .attach(values.ids.map(function(id) {
                  return values.model.forge({id: id});
                }));
            });
        }));
      });
  }

}

module.exports = BaseController;
