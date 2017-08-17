'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _antdMobile = require('antd-mobile');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storageString = function storageString(_storageString) {
    if (_storageString && typeof _storageString == 'string') {
        return '' + _storageString;
    } else {
        _antdMobile.Toast.info('localStorage存储键名异常');
    }
};

var StorageModule = function () {
    function StorageModule() {
        _classCallCheck(this, StorageModule);
    }

    _createClass(StorageModule, null, [{
        key: '_getUserInfo',
        value: function _getUserInfo() {
            return localStorage.getItem(storageString('userInfo'));
        }
    }, {
        key: '_setUserInfo',
        value: function _setUserInfo(historyItem) {
            return localStorage.setItem(storageString('userInfo'), JSON.stringify(historyItem));
        }
    }, {
        key: '_removeUserInfo',
        value: function _removeUserInfo() {
            return localStorage.removeItem(storageString('userInfo'));
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            return localStorage.setItem(storageString(key.toString()), value);
        }
    }, {
        key: 'get',
        value: function get(e) {
            return localStorage.getItem(storageString(e));
        }
    }, {
        key: '_removeItem',
        value: function _removeItem(key) {
            return localStorage.removeItem(storageString(key));
        }
    }]);

    return StorageModule;
}();

/**
 * 本地存储的字段名称:
 * locationCity   [array]['储存用户的选择城市历史']
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */


exports.default = StorageModule;