var router = require('express').Router();
var PermissionController = require('../controllers/permission');
var User = require('../models/user');
var _ = require('underscore');
var jwt = require('jsonwebtoken');

var permissionCtrl = new PermissionController();

router.use('/permissions/usable', require('../middlewares/ensure-authenticated'));

router.get('/permissions/usable', function(req, res) {
  return getUserPermissions(req.userId)
    .then(function(permissions) {
      // console.log(permissions);
      res.json(permissions);
    });
});

function getUserPermissions(id) {
  return User
    .forge({id: id})
    .fetch({withRelated: 'roles'})
    .then(function(user) {
      return user
        .related('roles')
        .fetch({withRelated: 'permissions'});
    })
    .then(function(roles) {
      // console.log(JSON.stringify(roles.toJSON(), null, 2));
      var permissions = roles.toJSON().reduce(function(memo, role, index) {
        role.permissions.forEach(function(permission) {
          memo[permission.id] = permission;
        });
        return memo;
      }, {});
      return _.toArray(permissions);
    });
};

router
  .route('/permissions')
  .get(function(req, res) {
    if (req.query._filters) {
      var filters = JSON.parse(req.query._filters);
      if (filters.user_id) {
        return getUserPermissions(filters.user_id).then(function(permissions) {
          res.json(permissions);
        });
      }
    }

    permissionCtrl
      .application(req.appID)
      .getAll()
      .then(function(permissions) {
        res.json(permissions);
      });
  })
  .post(function(req, res) {
    permissionCtrl
      .application(req.appID)
      .create(req.body)
      .then(function(permission) {
        return res.json(permission);
      });
  });

router
  .route('/permissions/:id')
  .get(function(req, res) {
    permissionCtrl
      .getById(req.params.id)
      .then(function(permission) {
        return res.json(permission);
      });
  })
  .delete(function(req, res) {
    permissionCtrl
      .removeById(req.params.id)
      .then(function() {
        res.json('ok');
      });
  })
  .put(function(req, res) {
    permissionCtrl
      .update(req.body)
      .then(function(permission) {
        return res.json(permission);
      });
  });

module.exports = router;
