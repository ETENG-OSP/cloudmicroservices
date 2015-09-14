'use strict';

var BaseController = require('./base');

var Permission = require('../models/permission');
var Role = require('../models/role');

class PermissionController extends BaseController {
  constructor() {
    super();
    this.Model = Permission;
    this.related = {
      roles: Role
    };
  }
}

module.exports = PermissionController;
