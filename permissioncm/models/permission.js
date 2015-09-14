module.exports = {

  identity: 'permission',

  schema: true,

  attributes: {

    name: 'string',

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
