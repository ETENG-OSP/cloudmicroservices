var router = require('express').Router();
var factory = require('../lib/create-resource-router');

var userApi = factory('user');
router.use('/api', userApi);

module.exports = router;
