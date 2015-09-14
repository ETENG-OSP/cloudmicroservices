var bcrypt = require('bcrypt');

var Administrator = {

  identity: 'user',

  schema: true,

  attributes: {

    username: {
      type: 'string',
      index: true,
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    active: 'boolean',

    comparePassword: function(password) {
      var self = this;
      return new Promise(function(resolve, reject) {
        bcrypt.compare(password, self.password, function(err, match) {
          if (err) {
            return reject(err);
          }
          if (!match) {
            return reject(new Error('用户名与密码不匹配'));
          }
          resolve(self);
        });
      });
    }

  },

  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 8, function(err, hash) {
      if (err) {
        return next(err);
      }
      values.password = hash;
      next();
    });
  },

  login: function(credentials) {
    return this
      .findOne({username: credentials.username})
      .then(function(entity) {
        if (!entity) {
          throw new Error('该用户不存在');
        }
        return entity.comparePassword(credentials.password);
      })
      .then(function(entity) {
        return entity.toJSON();
      });
  },

  signup: function(credentials) {
    return this
      .create({
        username: credentials.username,
        password: credentials.password
      })
      .then(function(entity) {
        return entity.toJSON();
      });
  }

};

module.exports = Administrator;
