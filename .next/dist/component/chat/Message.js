"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/daisuke/Develop/nextChat/component/chat/Message.js";


var Message = function (_React$Component) {
  (0, _inherits3.default)(Message, _React$Component);

  function Message() {
    (0, _classCallCheck3.default)(this, Message);

    return (0, _possibleConstructorReturn3.default)(this, (Message.__proto__ || (0, _getPrototypeOf2.default)(Message)).apply(this, arguments));
  }

  (0, _createClass3.default)(Message, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", { className: "Message", __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        }
      }, _react2.default.createElement("img", { className: "Message__img", src: this.props.message.profile_image, __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }), _react2.default.createElement("div", { className: "Message__body", __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, _react2.default.createElement("p", { className: "Message__body__name", __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      }, "@", this.props.message.user_name), _react2.default.createElement("p", { className: "Message__body__text", __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, this.props.message.text)));
    }
  }]);

  return Message;
}(_react2.default.Component);

exports.default = Message;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC9jaGF0L01lc3NhZ2UuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJNZXNzYWdlIiwicHJvcHMiLCJtZXNzYWdlIiwicHJvZmlsZV9pbWFnZSIsInVzZXJfbmFtZSIsInRleHQiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7Ozs7Ozs7O0ksQUFFYzs7Ozs7Ozs7Ozs7NkJBQ1YsQUFDUDs2QkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0U7QUFERjtPQUFBLHlDQUNPLFdBQUwsQUFBZSxnQkFBZSxLQUFLLEtBQUEsQUFBSyxNQUFMLEFBQVcsUUFBOUMsQUFBc0Q7b0JBQXREO3NCQURGLEFBQ0UsQUFDQTtBQURBOzBCQUNBLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRTtBQURGO3lCQUNFLGNBQUEsT0FBRyxXQUFILEFBQWE7b0JBQWI7c0JBQUE7QUFBQTtTQUFxQyxVQUFBLEFBQUssTUFBTCxBQUFXLFFBRGxELEFBQ0UsQUFBd0QsQUFDeEQsNEJBQUEsY0FBQSxPQUFHLFdBQUgsQUFBYTtvQkFBYjtzQkFBQSxBQUFvQztBQUFwQztjQUFvQyxBQUFLLE1BQUwsQUFBVyxRQUxyRCxBQUNFLEFBRUUsQUFFRSxBQUF1RCxBQUk5RDs7Ozs7RUFYa0MsZ0JBQU0sQTs7a0JBQXRCLEEiLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZGFpc3VrZS9EZXZlbG9wL25leHRDaGF0In0=