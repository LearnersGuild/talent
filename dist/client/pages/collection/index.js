'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _userGallery = require('./userGallery');

var _userGallery2 = _interopRequireDefault(_userGallery);

var _blurb = require('../../components/blurb');

var _blurb2 = _interopRequireDefault(_blurb);

var _projects = require('../../components/projects');

var _projects2 = _interopRequireDefault(_projects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollectionPage = function (_Component) {
  _inherits(CollectionPage, _Component);

  function CollectionPage() {
    _classCallCheck(this, CollectionPage);

    return _possibleConstructorReturn(this, (CollectionPage.__proto__ || Object.getPrototypeOf(CollectionPage)).apply(this, arguments));
  }

  _createClass(CollectionPage, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_blurb2.default, { className: 'col-lg-1 pagination-center', info: this.props.info }),
        _react2.default.createElement(_userGallery2.default, { data: this.props.data }),
        _react2.default.createElement(
          'h2',
          { className: 'text-center' },
          'Projects'
        ),
        _react2.default.createElement(_projects2.default, { projects: this.props.projects })
      );
    }
  }]);

  return CollectionPage;
}(_react.Component);

exports.default = CollectionPage;