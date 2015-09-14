'use strict';

var BaseController = require('./base');

var Role = require('../models/role');
var User = require('../models/user');
var Permission = require('../models/permission');

class RoleController extends BaseController {
  constructor() {
    super();
    this.Model = Role;
    this.related = {
      users: User,
      permissions: Permission
    };
  }
}

module.exports = RoleController;
