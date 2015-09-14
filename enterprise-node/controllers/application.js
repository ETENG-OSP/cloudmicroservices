'use strict';

var BaseController = require('./base');

var Application = require('../models/application');
var Feature = require('../models/feature');

class ApplicationController extends BaseController {
  constructor() {
    super();
    this.Model = Application;
  }

  getRelatedFeatures(id) {
    return Application
      .forge({id: id})
      .features()
      .fetch()
      .then(function(results) {
        return results.toJSON();
      });
  }
}

module.exports = ApplicationController;
