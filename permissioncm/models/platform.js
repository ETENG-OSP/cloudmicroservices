var uuid = require('uuid');

module.exports = {

  identity: 'platform',

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
    }

  }

};
