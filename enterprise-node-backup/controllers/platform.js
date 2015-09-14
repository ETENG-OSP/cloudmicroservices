'use strict';

var BaseController = require('./base');

var Platform = require('../models/platform');

class PlatformController extends BaseController {
  constructor() {
    super();
    this.Model = Platform;
  }
}

module.exports = PlatformController;
