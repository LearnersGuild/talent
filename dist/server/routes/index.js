'use strict';

var _server = require('react-dom/server');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _routes = require('../../client/routes');

var _routes2 = _interopRequireDefault(_routes);

var _renderFullPage = require('./renderFullPage');

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _mockData = require('../db/mock-data.js');

var _app = require('../../client/components/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();


var path = require('path');

router.use('*', function (req, res) {
  var match = _routes2.default.reduce(function (acc, route) {
    return (0, _reactRouterDom.matchPath)(req.url, { path: route, exact: true }) || acc;
  }, null);

  var context = {};

  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRouterDom.StaticRouter,
    { context: context, location: req.url },
    _react2.default.createElement(_app2.default, null)
  ));
  res.send((0, _renderFullPage2.default)(html));
});

module.exports = router;