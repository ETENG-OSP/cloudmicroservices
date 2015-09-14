var uuid = require('uuid');

var Feature = {

  identity: 'feature',
  connection: 'filestore',
  schema: true,

  attributes: {

    name: 'string',

    url: 'string',

    description: 'string',

    secret: 'string',

    active: 'boolean',

    owner: {
      model: 'administrator'
    },

    applications: {
      collection: 'application',
      via: 'features'
    }

  },

  beforeCreate: function(values, next) {
    if (!values.secret) {
      values.secret = new Buffer(uuid.v4()).toString('base64');
    }
    next();
  }

};

module.exports = Feature;
