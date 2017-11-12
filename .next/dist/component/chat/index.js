'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('../../firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

var _Chatbox = require('./Chatbox');

var _Chatbox2 = _interopRequireDefault(_Chatbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/daisuke/Develop/nextChat/component/chat/index.js';
// import './chat.css';


var firebaseDb = _firebase2.default.database();
var messageRef = firebaseDb.ref('messages');

var Chat = function (_Component) {
  (0, _inherits3.default)(Chat, _Component);

  function Chat(props) {
    (0, _classCallCheck3.default)(this, Chat);

    // method を使えるようにbind
    var _this = (0, _possibleConstructorReturn3.default)(this, (Chat.__proto__ || (0, _getPrototypeOf2.default)(Chat)).call(this, props));

    _this.onTextChange = _this.onTextChange.bind(_this);
    _this.onButtonClick = _this.onButtonClick.bind(_this);

    _this.state = {
      text: '',
      user_name: '',
      profile_image: '',
      messages: []
    };
    return _this;
  }

  // 現状のDBの内容の取得とセット


  (0, _createClass3.default)(Chat, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      messageRef.on('child_added', function (snapshot) {
        var m = snapshot.val();
        var msgs = _this2.state.messages;

        msgs.push({
          'text': m.text,
          'user_name': m.user_name,
          'profile_image': m.profile_image
        });

        _this2.setState({
          messages: msgs
        });
      });
    }
  }, {
    key: 'onTextChange',
    value: function onTextChange(e) {
      // 現状の保持データのアップデート(追加)
      if (e.target.name == 'user_name') {
        this.setState({
          "user_name": e.target.value
        });
      } else if (e.target.name == 'profile_image') {
        this.setState({
          "profile_image": e.target.value
        });
      } else if (e.target.name == "text") {
        this.setState({
          "text": e.target.value
        });
      }
    }
  }, {
    key: 'onButtonClick',
    value: function onButtonClick(e) {
      if (this.state.user_name == "") {
        alert('user_name empty');
        return;
      } else if (this.state.text == "") {
        alert('text empty');
        return;
      }

      // Submit to firebaseDb
      messageRef.push({
        "user_name": this.state.user_name,
        "profile_image": this.state.profile_image,
        "text": this.state.text
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'Chat', __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }, _react2.default.createElement('div', { className: 'ChatHeader', __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement('h2', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, 'Chat')), _react2.default.createElement('div', { className: 'ChatBody', __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, _react2.default.createElement('div', { className: 'MessageList', __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, this.state.messages.map(function (m, i) {
        return _react2.default.createElement(_Message2.default, { key: i, message: m, __source: {
            fileName: _jsxFileName,
            lineNumber: 90
          }
        });
      })), _react2.default.createElement(_Chatbox2.default, { onTextChange: this.onTextChange, onButtonClick: this.onButtonClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      })));
    }
  }]);

  return Chat;
}(_react.Component);

exports.default = Chat;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC9jaGF0L2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiZmlyZWJhc2UiLCJNZXNzYWdlIiwiQ2hhdEJveCIsImZpcmViYXNlRGIiLCJkYXRhYmFzZSIsIm1lc3NhZ2VSZWYiLCJyZWYiLCJDaGF0IiwicHJvcHMiLCJvblRleHRDaGFuZ2UiLCJiaW5kIiwib25CdXR0b25DbGljayIsInN0YXRlIiwidGV4dCIsInVzZXJfbmFtZSIsInByb2ZpbGVfaW1hZ2UiLCJtZXNzYWdlcyIsIm9uIiwic25hcHNob3QiLCJtIiwidmFsIiwibXNncyIsInB1c2giLCJzZXRTdGF0ZSIsImUiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJhbGVydCIsIm1hcCIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBRWhCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFhOzs7Ozs7O0FBSHBCOzs7QUFLQSxJQUFNLGFBQWEsbUJBQW5CLEFBQW1CLEFBQVM7QUFDNUIsSUFBTSxhQUFhLFdBQUEsQUFBVyxJQUE5QixBQUFtQixBQUFlOztJQUViLEE7Z0NBQ25COztnQkFBQSxBQUFZLE9BQU87d0NBR2pCOztBQUhpQjtrSUFBQSxBQUNYLEFBR047O1VBQUEsQUFBSyxlQUFlLE1BQUEsQUFBSyxhQUFMLEFBQWtCLEtBQXRDLEFBQ0E7VUFBQSxBQUFLLGdCQUFnQixNQUFBLEFBQUssY0FBTCxBQUFtQixLQUF4QyxBQUVBOztVQUFBLEFBQUs7WUFBUSxBQUNMLEFBQ047aUJBRlcsQUFFQSxBQUNYO3FCQUhXLEFBR0ksQUFDZjtnQkFYZSxBQU9qQixBQUFhLEFBSUQ7QUFKQyxBQUNYO1dBS0g7QUFFRDs7Ozs7Ozt5Q0FDcUI7bUJBQ25COztpQkFBQSxBQUFXLEdBQVgsQUFDRSxlQUFlLFVBQUEsQUFBQyxVQUFhLEFBQzNCO1lBQU0sSUFBSSxTQUFWLEFBQVUsQUFBUyxBQUNuQjtZQUFJLE9BQU8sT0FBQSxBQUFLLE1BQWhCLEFBQXNCLEFBRXRCOzthQUFBLEFBQUs7a0JBQ0ssRUFEQSxBQUNFLEFBQ1Y7dUJBQWEsRUFGTCxBQUVPLEFBQ2Y7MkJBQWlCLEVBSG5CLEFBQVUsQUFHVyxBQUdyQjtBQU5VLEFBQ1I7O2VBS0YsQUFBSztvQkFBTCxBQUFjLEFBQ0YsQUFFYjtBQUhlLEFBQ1o7QUFaTixBQWdCRDs7OztpQyxBQUVZLEdBQUcsQUFDZDtBQUNBO1VBQUksRUFBQSxBQUFFLE9BQUYsQUFBUyxRQUFiLEFBQXFCLGFBQWEsQUFDaEM7YUFBQSxBQUFLO3VCQUNVLEVBQUEsQUFBRSxPQURqQixBQUFjLEFBQ1UsQUFFekI7QUFIZSxBQUNaO0FBRkosaUJBSVcsRUFBQSxBQUFFLE9BQUYsQUFBUyxRQUFiLEFBQXFCLGlCQUFpQixBQUMzQzthQUFBLEFBQUs7MkJBQ2MsRUFBQSxBQUFFLE9BRHJCLEFBQWMsQUFDYyxBQUU3QjtBQUhlLEFBQ1o7QUFGRyxPQUFBLE1BSUEsSUFBSSxFQUFBLEFBQUUsT0FBRixBQUFTLFFBQWIsQUFBcUIsUUFBUSxBQUNsQzthQUFBLEFBQUs7a0JBQ0ssRUFBQSxBQUFFLE9BRFosQUFBYyxBQUNLLEFBRXBCO0FBSGUsQUFDWjtBQUdMOzs7O2tDLEFBRWEsR0FBRyxBQUNmO1VBQUksS0FBQSxBQUFLLE1BQUwsQUFBVyxhQUFmLEFBQTRCLElBQUksQUFDOUI7Y0FBQSxBQUFNLEFBQ047QUFDRDtBQUhELGFBR08sSUFBSSxLQUFBLEFBQUssTUFBTCxBQUFXLFFBQWYsQUFBdUIsSUFBSSxBQUNoQztjQUFBLEFBQU0sQUFDTjtBQUNEO0FBRUQ7O0FBQ0E7aUJBQUEsQUFBVztxQkFDSSxLQUFBLEFBQUssTUFESixBQUNVLEFBQ3hCO3lCQUFpQixLQUFBLEFBQUssTUFGUixBQUVjLEFBQzVCO2dCQUFRLEtBQUEsQUFBSyxNQUhmLEFBQWdCLEFBR0ssQUFFdEI7QUFMaUIsQUFDZDs7Ozs2QkFNSyxBQUNQOzZCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBRkosQUFDRSxBQUNFLEFBRUYsMEJBQUEsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUVJO0FBRko7Y0FFSSxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLElBQUksVUFBQSxBQUFDLEdBQUQsQUFBSSxHQUFNLEFBQ2hDOytCQUFPLEFBQUMsbUNBQVEsS0FBVCxBQUFjLEdBQUcsU0FBakIsQUFBMEI7c0JBQTFCO3dCQUFQLEFBQU8sQUFDUjtBQURRO1NBQUE7QUFKZixBQUNFLEFBRUksQUFLSiwyQkFBQSxBQUFDLG1DQUFRLGNBQWMsS0FBdkIsQUFBNEIsY0FBYyxlQUFlLEtBQXpELEFBQThEO29CQUE5RDtzQkFiTixBQUNFLEFBSUUsQUFRRSxBQUlQO0FBSk87Ozs7OztBQXBGd0IsQTs7a0JBQWIsQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZGFpc3VrZS9EZXZlbG9wL25leHRDaGF0In0=