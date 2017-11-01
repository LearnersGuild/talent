'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TalentNavbar = function (_Component) {
  _inherits(TalentNavbar, _Component);

  function TalentNavbar() {
    _classCallCheck(this, TalentNavbar);

    return _possibleConstructorReturn(this, (TalentNavbar.__proto__ || Object.getPrototypeOf(TalentNavbar)).apply(this, arguments));
  }

  _createClass(TalentNavbar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            _reactBootstrap.Navbar,
            { fixedTop: true },
            _react2.default.createElement(
              _reactBootstrap.Navbar.Header,
              null,
              _react2.default.createElement(
                _reactBootstrap.Navbar.Brand,
                null,
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/' },
                  'Home'
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Nav,
              null,
              _react2.default.createElement(
                _reactBootstrap.NavDropdown,
                { eventKey: 1, title: 'Dropdown', id: 'basic-nav-dropdown' },
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: 1.1 },
                  'Action'
                ),
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: 1.2 },
                  'Another action'
                ),
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: 1.3 },
                  'Something else here'
                ),
                _react2.default.createElement(_reactBootstrap.MenuItem, { divider: true }),
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: 1.4 },
                  'Separated link'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return TalentNavbar;
}(_react.Component);

exports.default = TalentNavbar;