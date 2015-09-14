var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var app = express();

app.use('/app/:appID', express.static(__dirname + '/../public/permission'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/app/:appID', function(req, res, next) {
  req.appID = req.params.appID;
  next();
});
app.use('/app/:appID', require('../routers/api'));
app.use(require('../routers/api'));

module.exports = app;
