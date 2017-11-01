'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _blurb = require('../../../components/blurb');

var _blurb2 = _interopRequireDefault(_blurb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = function (_Component) {
  _inherits(Profile, _Component);

  function Profile() {
    _classCallCheck(this, Profile);

    return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
  }

  _createClass(Profile, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          this.props.info.name
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement('img', { className: 'img-responsive col-sm-5', src: '/LearnerImage.png' }),
          _react2.default.createElement(_blurb2.default, { className: 'col-sm-4', info: this.props.info })
        ),
        _react2.default.createElement(
          _reactBootstrap.ButtonToolbar,
          { className: 'row' },
          _react2.default.createElement(
            _reactBootstrap.DropdownButton,
            { bsSize: 'large', title: 'Personal Contact Information', id: 'dropdown-size-large' },
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: '1' },
              'Action'
            ),
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: '2' },
              'Another action'
            ),
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: '3' },
              'Something else here'
            ),
            _react2.default.createElement(_reactBootstrap.MenuItem, { divider: true }),
            _react2.default.createElement(
              _reactBootstrap.MenuItem,
              { eventKey: '4' },
              'Separated link'
            )
          )
        )
      );
    }
  }]);

  return Profile;
}(_react.Component);

exports.default = Profile;