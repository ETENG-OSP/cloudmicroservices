// var bookshelf = require('../lib/bookshelf-permission');
//
// var Permission = bookshelf.Model.extend({
//   tableName: 'permissions',
//
//   parse: function(attrs) {
//     if (attrs.meta) {
//       attrs.meta = JSON.parse(attrs.meta);
//     }
//     return attrs;
//   },
//
//   format: function(attrs) {
//     if (attrs.meta) {
//       attrs.meta = JSON.stringify(attrs.meta);
//     }
//     return attrs;
//   },
//
//   application: function() {
//     return this.belongsTo(require('./application'));
//   },
//
//   roles: function() {
//     return this.belongsToMany(require('./role'));
//   },
//
//   parent: function() {
//     return this.belongsTo(Permission);
//   }
// });

var Waterline = require('waterline');

var Permission = Waterline.Collection.extend({
  identity: 'permission',
  attributes: {

    name: {
      type: 'string'
    },

    url: {
      type: 'string'
    },

    roles: {

    },

    platform: {
      model: 'platform'
    },

    meta: {

    },

    parent: {
      model: 'permission'
    }

  }
});

module.exports = Permission;
