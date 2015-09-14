var bookshelf = require('../lib/bookshelf-permission');

var RoleUser = bookshelf.Model.extend({

  tableName: 'roles_users',

  user_id: function() {
    return this.belongsTo(require('./user'));
  },

  role_id: function() {
    return this.belongsTo(require('./role'));
  }

});

module.exports = RoleUser;
