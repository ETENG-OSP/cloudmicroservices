var uuid = require('uuid');

module.exports = {

  identity: 'role',

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

    name: 'string',

    code: {
      type: 'string',
      unique: true
    },

    users: {
      collection: 'user',
      via: 'roles',
      dominant: true
    },

    permissions: {
      collection: 'permission',
      via: 'roles',
      dominant: true
    }

  }

};
