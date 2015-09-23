var uuid = require('uuid');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var jwt = require('jsonwebtoken');

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
    },

    install: function(application) {
      var url = this.url;
      var self = this;

      var token = jwt.sign({
        secret: application.secret
      }, this.secret, {
        issuer: this.id,
        audience: application.id
      });
      console.log(url);
      console.log(token);

      return request
        .postAsync(url, {
          body: {},
          headers: {
            'cm-api-key': token
          },
          json: true
        })
        .then(function(response, body) {
          console.log(response);
          application.features.add(self.id);
          return application.save();
        });
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
