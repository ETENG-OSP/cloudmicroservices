var router = require('express').Router();

router
  .route('/auth/login')
  .post(function(req, res) {
    console.log();
    res.json({
      appId: req.appId
    });
  })

module.exports = router;
