var bookshelf = require('../lib/bookshelf-permission');

var Platform = bookshelf.Model.extend({
  tableName: 'platforms',

  application: function() {
    return this.belongsTo(require('./application'));
  }

});

module.exports = Platform;
