"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fetchStatus = require("../fetch-status");

var _fetchStatus2 = _interopRequireDefault(_fetchStatus);

var _fetchView = require("./fetchView");

var _antdMobile = require("antd-mobile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stateHOC = function stateHOC() {
    var hocParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (WrappedComponent) {
        var _class, _temp;

        return _temp = _class = function (_WrappedComponent) {
            _inherits(StateContainer, _WrappedComponent);

            function StateContainer() {
                _classCallCheck(this, StateContainer);

                return _possibleConstructorReturn(this, (StateContainer.__proto__ || Object.getPrototypeOf(StateContainer)).apply(this, arguments));
            }

            _createClass(StateContainer, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                    _get(StateContainer.prototype.__proto__ || Object.getPrototypeOf(StateContainer.prototype), "hocComponentDidMount", this).call(this);
                }
            }, {
                key: "render",
                value: function render() {
                    var fetchStatus = this.props.fetchStatus;
                    var detail = hocParams.detail,
                        keyFunc = hocParams.keyFunc,
                        key = hocParams.key;


                    if (detail) {

                        if (!keyFunc || !key) {
                            _antdMobile.Toast.error('装饰器参数传递错误');
                            return null;
                        }

                        var params = this.props.navigation.state.params;

                        var id = params[key];

                        return this.showView(fetchStatus[keyFunc(id)]);
                    } else {
                        return this.showView(fetchStatus);
                    }
                }
            }, {
                key: "showView",
                value: function showView(fetchStatus) {
                    var height = hocParams.height;
                    var _props = this.props,
                        LoadingView = _props.LoadingView,
                        FailureView = _props.FailureView,
                        ErrorView = _props.ErrorView;


                    var LoadingViewStyle = Object.assign({}, {
                        autoLayout: height == undefined ? true : false,
                        height: height
                    });

                    switch (fetchStatus) {
                        case _fetchStatus2.default.l:
                            return _react2.default.createElement(LoadingView, LoadingViewStyle);
                        case _fetchStatus2.default.s:
                            return _react2.default.createElement(WrappedComponent, this.props);
                        case _fetchStatus2.default.f:
                            return _react2.default.createElement(FailureView, { autoLayout: true });
                        case _fetchStatus2.default.e:
                            return _react2.default.createElement(ErrorView, { autoLayout: true });
                        default:
                            return null;
                    }
                }
            }]);

            return StateContainer;
        }(WrappedComponent), _class.navigationOptions = WrappedComponent.navigationOptions, _class.propTypes = {
            LoadingView: _propTypes2.default.func,
            FailureView: _propTypes2.default.func,
            ErrorView: _propTypes2.default.func
        }, _class.defaultProps = {
            LoadingView: _fetchView.LoadingView,
            FailureView: _fetchView.FailureView,
            ErrorView: _fetchView.ErrorView
        }, _temp;
    };
};

exports.default = stateHOC;