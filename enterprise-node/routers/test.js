var router = require('express').Router();
var ensureAuthenticated = require('../middlewares/ensure-authenticated');

router.get('/', ensureAuthenticated, function(req, res) {
  res.json('ok');
});

module.exports = router;
