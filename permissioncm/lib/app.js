var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var cmlib = require('../cmlib');

var cm = cmlib(require('./config'));
var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../public'));

app.use(cm.verify);
app.use(cm.issuerCheck);
app.use(cm.audienceCheck);

app.use(require('../routers/api'));

module.exports = app;
