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

var _jsxFileName = "/Users/daisuke/Develop/nextChat/component/chat/Chatbox.js";


var ChatBox = function (_React$Component) {
  (0, _inherits3.default)(ChatBox, _React$Component);

  function ChatBox() {
    (0, _classCallCheck3.default)(this, ChatBox);

    return (0, _possibleConstructorReturn3.default)(this, (ChatBox.__proto__ || (0, _getPrototypeOf2.default)(ChatBox)).apply(this, arguments));
  }

  (0, _createClass3.default)(ChatBox, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", { className: "ChatBox", __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        }
      }, _react2.default.createElement("div", { className: "", __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, _react2.default.createElement("input", { name: "user_name", onChange: this.props.onTextChange, className: "", placeholder: "\u540D\u524D", __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }), _react2.default.createElement("input", { name: "profile_image", onChange: this.props.onTextChange, className: "", placeholder: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CFURL", __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      })), _react2.default.createElement("textarea", { name: "text", className: "", onChange: this.props.onTextChange, __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }), _react2.default.createElement("button", { className: "", onClick: this.props.onButtonClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, "\u9001\u4FE1"));
    }
  }]);

  return ChatBox;
}(_react2.default.Component);

exports.default = ChatBox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC9jaGF0L0NoYXRib3guanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDaGF0Qm94IiwicHJvcHMiLCJvblRleHRDaGFuZ2UiLCJvbkJ1dHRvbkNsaWNrIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7Ozs7OztJLEFBRWM7Ozs7Ozs7Ozs7OzZCQUNWLEFBQ1A7NkJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0U7QUFERjtrREFDUyxNQUFQLEFBQVksYUFBWSxVQUFVLEtBQUEsQUFBSyxNQUF2QyxBQUE2QyxjQUFjLFdBQTNELEFBQXFFLElBQUcsYUFBeEUsQUFBb0Y7b0JBQXBGO3NCQURGLEFBQ0UsQUFDQTtBQURBO21EQUNPLE1BQVAsQUFBWSxpQkFBZ0IsVUFBVSxLQUFBLEFBQUssTUFBM0MsQUFBaUQsY0FBYyxXQUEvRCxBQUF5RSxJQUFHLGFBQTVFLEFBQXdGO29CQUF4RjtzQkFISixBQUNFLEFBRUUsQUFHRjtBQUhFO3VEQUdRLE1BQVYsQUFBZSxRQUFPLFdBQXRCLEFBQWdDLElBQUcsVUFBVSxLQUFBLEFBQUssTUFBbEQsQUFBd0Q7b0JBQXhEO3NCQU5GLEFBTUUsQUFDQTtBQURBOzBCQUNBLGNBQUEsWUFBUSxXQUFSLEFBQWtCLElBQUcsU0FBUyxLQUFBLEFBQUssTUFBbkMsQUFBeUM7b0JBQXpDO3NCQUFBO0FBQUE7U0FSSixBQUNFLEFBT0UsQUFHTDs7Ozs7RUFia0MsZ0JBQU0sQTs7a0JBQXRCLEEiLCJmaWxlIjoiQ2hhdGJveC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZGFpc3VrZS9EZXZlbG9wL25leHRDaGF0In0=