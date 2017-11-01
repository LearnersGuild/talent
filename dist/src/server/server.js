'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var path = require('path');
var app = express();


var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../public')));

app.use('*', _routes2.default);

app.listen(port, function () {
  console.log('http://localhost:' + port);
});
exports.default = app;