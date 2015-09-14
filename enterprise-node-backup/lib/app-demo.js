var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var app = express();

app.use(express.static(__dirname + '/../public/demo'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(require('../routers/api'));

module.exports = app;
