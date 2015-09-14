var bcrypt = require('bcrypt');

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
