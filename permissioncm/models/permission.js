var uuid = require('uuid');

module.exports = {

  identity: 'permission',

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

    url: 'string',

    meta: 'json',

    code: {
      type: 'string',
      unique: true
    },

    platform: {
      model: 'platform'
    },

    parent: {
      model: 'permission'
    },

    roles: {
      collection: 'role',
      via: 'permissions'
    }

  }

};
