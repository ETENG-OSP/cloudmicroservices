module.exports = {

  identity: 'user',

  schema: true,

  attributes: {

    roles: {
      collection: 'role',
      via: 'users'
    }

  }

};
