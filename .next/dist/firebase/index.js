'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var firebase = _interopRequireWildcard(_firebase);

var _config = require('./config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = !firebase.apps.length ? firebase.initializeApp(_config.firebaseConfig) : firebase.app();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpcmViYXNlL2luZGV4LmpzIl0sIm5hbWVzIjpbImZpcmViYXNlIiwiZmlyZWJhc2VDb25maWciLCJhcHBzIiwibGVuZ3RoIiwiaW5pdGlhbGl6ZUFwcCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTzs7SUFBSyxBQUFaOztBQUNBLEFBQVMsQUFBVCxBQUErQixBQUEvQixBQUVBOzs7O2tCQUFlLENBQUMsU0FBUyxBQUFULEtBQWMsQUFBZixTQUF3QixTQUFTLEFBQVQsQUFBdUIsQUFBdkIsQUFBeEIsd0NBQWlFLFNBQVMsQUFBVCxBQUFoRiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZGFpc3VrZS9EZXZlbG9wL25leHRDaGF0In0=