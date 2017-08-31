'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FailureView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FailureView = exports.FailureView = function (_Component) {
    _inherits(FailureView, _Component);

    function FailureView() {
        _classCallCheck(this, FailureView);

        return _possibleConstructorReturn(this, (FailureView.__proto__ || Object.getPrototypeOf(FailureView)).apply(this, arguments));
    }

    _createClass(FailureView, [{
        key: 'render',
        value: function render() {
            var autoLayout = this.props.autoLayout;

            return _react2.default.createElement(
                'div',
                null,
                '\u5931\u8D25\u4E86\u5462'
            );
        }
    }]);

    return FailureView;
}(_react.Component);

FailureView.propTypes = {
    height: _react.PropTypes.number,
    autoLayout: _react.PropTypes.bool
};
FailureView.defaultProps = {
    height: window.innerWidth * 0.4,
    autoLayout: false
};
exports.default = FailureView;