'use strict';

var BaseController = require('./base');
var comparePassword = require('../utils/compare-password');
var createJWT = require('../utils/create-jwt');
var hashPassword = require('../utils/hash-password');

class UserController extends BaseController {

  constructor() {
    // var User = require('../models/user');
    // var Role = require('../models/role');
    super();
    this.Model = User;
    this.related = {
      roles: Role
    };
  }

  static login(userData) {
    var username = userData.username;
    var password = userData.password;
    var _user = null;
    return User
      .forge({username: username})
      .fetch({require: true})
      .then(function(user) {
        _user = user;
        return comparePassword(password, user.get('password'));
      })
      .then(function(res) {
        if (!res) {
          var err = new Error('密码不正确')
          err.code = 'PASSWORD_INCORRECT';
          throw err;
        }
        console.log('_user', _user);
        return createJWT(_user);
      });
  }

  static signup(userData, appID) {
    var username = userData.username;
    var password = userData.password;
    return User
      .forge({
        username: username,
        application: appID
      })
      .fetch()
      .then(function(storedUser) {
        if (storedUser) {
          var err = new Error('已经注册');
          err.code = 'ALREADY_SIGNUP';
          throw err;
        }
        return hashPassword(password);
      })
      .then(function(hash) {
        return User.forge({
          username: username,
          password: hash,
          application: appID
        }).save();
      })
      .then(function(user) {
        var result = user.toJSON();
        result.audience = appID;
        result.token = createJWT(result);
        return result;
      });
  }

}

module.exports = UserController;
