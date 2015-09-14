var uuid = require('uuid');

var Application = {

  identity: 'application',

  connection: 'appstore',

  schema: true,

  attributes: {

    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      index: true
    },

    secret: {
      type: 'string',
      required: true,
      defaultsTo: function() {
        return new Buffer(uuid.v4()).toString('base64');
      }
    }
  }

};

module.exports = Application;
