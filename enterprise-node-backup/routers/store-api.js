var router = require('express').Router();
router.use('/api', require('./features'));
module.exports = router;
