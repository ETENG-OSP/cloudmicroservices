var bookshelf = require('../lib/bookshelf-permission');

var Role = bookshelf.Model.extend({
  tableName: 'roles',

  application: function() {
    return this.belongsTo(require('./application'));
  },

  permissions: function() {
    return this.belongsToMany(require('./permission'));
  },

  users: function() {
    return this
      .belongsToMany(require('./user'))
      .through(require('./role-user'));
  }

});

module.exports = Role;
