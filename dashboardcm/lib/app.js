var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(favicon(__dirname + '/../favicon.ico'));

module.exports = app;
