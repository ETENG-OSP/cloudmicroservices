var uuid = require('uuid');

var Application = {
  identity: 'application',
  connection: 'filestore',
  schema: true,

  attributes: {

    name: {
      type: 'string',
      // required: true
    },

    features: {
      collection: 'feature',
      via: 'applications',
      dominant: true
    },

    secret: {
      type: 'string',
      required: true,
      defaultsTo: function() {
        return new Buffer(uuid.v4()).toString('base64');
      }
    },

    owner: {
      model: 'administrator'
    }

  }

};

module.exports = Application;
