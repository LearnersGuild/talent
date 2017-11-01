'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouterDom = require('react-router-dom');

var _reactBootstrap = require('react-bootstrap');

var _index = require('../../public/index.scss');

var _index2 = _interopRequireDefault(_index);

var _mockData = require('../server/db/mock-data');

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _talentNavbar = require('./components/talentNavbar');

var _talentNavbar2 = _interopRequireDefault(_talentNavbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(
  _reactRouterDom.BrowserRouter,
  null,
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_talentNavbar2.default, null),
    _react2.default.createElement(_app2.default, null)
  )
), document.querySelector('.container'));