var uuid = require('uuid');

module.exports = {

  identity: 'user',

  schema: true,

  attributes: {

    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      defaultsTo: function() {
        return uuid.v4();
      }
    },

    roles: {
      collection: 'role',
      via: 'users'
    }

  }

};
