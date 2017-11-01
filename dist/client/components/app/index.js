'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _index = require('../../pages/collection/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../pages/profile/index');

var _index4 = _interopRequireDefault(_index3);

var _notFound = require('../notFound');

var _notFound2 = _interopRequireDefault(_notFound);

var _mockData = require('../../../server/db/mock-data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App(props) {

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', render: function render() {
          return _react2.default.createElement(_index2.default, { data: _mockData.fakeDB, info: _mockData.tempInfo[0], projects: _mockData.fakeProjects });
        } }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/learners', render: function render() {
          return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
        } }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/learners/:githubHandle', render: function render() {
          return _react2.default.createElement(_index4.default, { info: _mockData.userTempInfo[0], experience: _mockData.experience, skills: _mockData.skills, projects: _mockData.fakeProjects });
        } }),
      _react2.default.createElement(_reactRouterDom.Route, { component: _notFound2.default })
    )
  );
}