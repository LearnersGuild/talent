'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouterDom = require('react-router-dom');

var _reactBootstrap = require('react-bootstrap');

var _index = require('../../public/index.scss');

var _index2 = _interopRequireDefault(_index);

var _mockData = require('../server/db/mock-data');

var _talentNavbar = require('./components/talentNavbar');

var _talentNavbar2 = _interopRequireDefault(_talentNavbar);

var _index3 = require('./pages/collection/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./pages/profile/index');

var _index6 = _interopRequireDefault(_index5);

var _notFound = require('./components/notFound');

var _notFound2 = _interopRequireDefault(_notFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(_talentNavbar2.default, null),
  _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', render: function render() {
          return _react2.default.createElement(_index4.default, { data: _mockData.fakeDB, info: _mockData.tempInfo[0], projects: _mockData.fakeProjects });
        } }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/learners', render: function render() {
          return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
        } }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/learners/:githubHandle', render: function render() {
          return _react2.default.createElement(_index6.default, { info: _mockData.userTempInfo[0], experience: _mockData.experience, skills: _mockData.skills, projects: _mockData.fakeProjects });
        } }),
      _react2.default.createElement(_reactRouterDom.Route, { component: _notFound2.default })
    )
  )
), document.querySelector('.container'));