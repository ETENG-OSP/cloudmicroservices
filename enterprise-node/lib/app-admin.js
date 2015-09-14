var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var app = express();

app.use(express.static(__dirname + '/../public/admin'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(require('../routers/admin-auth'));
app.use(require('../routers/admin-api'));

module.exports = app;
