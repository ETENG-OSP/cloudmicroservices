var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var cmlib = require('../cmlib');

var config = {
  id: '3',
  secret: 'YTIxZjNhMWMtYTI2YS00NDJhLWJmZDMtZDYyMDljN2M4Yzc5'
};

var cm = cmlib(config);
var app = express();

app.use(express.static(__dirname + '/../public/auth'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cm.verify);
app.use(cm.issuerCheck);
app.use(cm.audienceCheck);

app.use(require('../routers/auth-api'));

module.exports = app;
