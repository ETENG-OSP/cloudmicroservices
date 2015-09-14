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

    owner: {
      model: 'administrator'
    }

  }

};

module.exports = Application;
