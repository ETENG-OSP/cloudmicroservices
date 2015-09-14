module.exports = {

  identity: 'role',

  schema: true,

  attributes: {

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
