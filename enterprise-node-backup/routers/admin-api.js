var router = require('express').Router();

router.use('/api', require('./applications'));

module.exports = router;
