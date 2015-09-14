var bookshelf = require('../lib/bookshelf-auth');

var User = bookshelf.Model.extend({
  tableName: 'users',

  application: function() {
    return this.belongsTo(require('./application'));
  },

  roles: function() {
    return this
      .belongsToMany(require('./role'))
      .through(require('./role-user'));
  }

});

module.exports = User;
