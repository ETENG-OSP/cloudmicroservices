var jwt = require('jsonwebtoken');
var config = require('../lib/config');

var secret = config.secret;

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Please make sure your request has an Authorization header'
    });
  }

  var token = req.headers.authorization.split(' ')[1];

  try {
    jwt.verify(token, secret);
    var payload = jwt.decode(token, secret);
    req.userId = payload.sub;

    next();
  } catch(e) {
    res.status(401).json({
      message: e
    });
  }
}

module.exports = ensureAuthenticated;
