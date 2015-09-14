var router = require('express').Router();

router.use(require('../middlewares/ensure-authenticated'));
router.use('/api', require('./users'));
router.use('/api', require('./platform'))
router.use('/api', require('./permissions'));
router.use('/api', require('./roles'));

module.exports = router;
