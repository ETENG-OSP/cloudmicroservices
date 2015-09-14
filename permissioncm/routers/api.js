var router = require('express').Router();

router.use('/api', require('./permission'));
router.use('/api', require('./role'));
router.use('/api', require('./platform'));
router.use('/api', require('./user'));

module.exports = router;
