'use strict';

var express = require('express');

class RouterFactory {

  createRouter(controller) {
    var router = express.Router();
    router.controller = controller;

    router.get('/', this.query.bind(router));
    router.get('/:id', this.getOne.bind(router));
    router.post('/', this.create.bind(router));
    router.put('/:id', this.update.bind(router));
    router.delete('/:id', this.delete.bind(router));

    return router;
  }

  query(req, res) {
    var ctrl = this.controller;

    return ctrl
      .getAll()
      .then(function(users) {
        res.json(users);
      });
  }

  getOne(req, res) {
    var ctrl = this.controller;

    return ctrl
      .getById(req.params.id)
      .then(function(user) {
        res.json(user);
      });
  }

  create(req, res) {
    var ctrl = this.controller;

    return ctrl
      .create(req.body)
      .then(function(instance) {
        res.json(instance);
      });
  }

  update(req, res) {
    var ctrl = this.controller;

    return ctrl
      .update(req.body)
      .then(function(user) {
        res.json(user);
      });
  }

  delete(req, res) {
    var ctrl = this.controller;

    return ctrl
      .removeById(req.params.id)
      .then(function() {
        res.json('ok');
      });
  }

}
