"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("isomorphic-fetch");

var _antdMobile = require("antd-mobile");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FetchDataModule = function () {
    function FetchDataModule() {
        _classCallCheck(this, FetchDataModule);
    }

    _createClass(FetchDataModule, null, [{
        key: "fetch",

        /*
         *  请求入口
        */
        value: function fetch(_ref) {
            var ApiName = _ref.ApiName,
                params = _ref.params,
                API_URL = _ref.API_URL,
                login = _ref.login,
                pushLoginFunc = _ref.pushLoginFunc,
                headers = _ref.headers,
                APP_ROOT_CONFIG = _ref.APP_ROOT_CONFIG,
                removeUserInfoFunc = _ref.removeUserInfoFunc;

            if (ApiName) {
                if (API_URL[ApiName].needLogin) {
                    if (login) {
                        return FetchDataModule.fetchData({ ApiName: ApiName, params: params, API_URL: API_URL, headers: headers, APP_ROOT_CONFIG: APP_ROOT_CONFIG, removeUserInfoFunc: removeUserInfoFunc });
                    } else {
                        return new Promise(function () {
                            pushLoginFunc && pushLoginFunc();
                        });
                    }
                } else {
                    return FetchDataModule.fetchData({ ApiName: ApiName, params: params, API_URL: API_URL, headers: headers, APP_ROOT_CONFIG: APP_ROOT_CONFIG, removeUserInfoFunc: removeUserInfoFunc });
                }
            } else {
                _antdMobile.Modal.alert("FetchDataModule模块调用异常，请检查传递参数");
            }
        }

        /*
         *  处理请求的接口
        */

    }, {
        key: "fetchData",
        value: function fetchData(_ref2) {
            var ApiName = _ref2.ApiName,
                params = _ref2.params,
                API_URL = _ref2.API_URL,
                headers = _ref2.headers,
                APP_ROOT_CONFIG = _ref2.APP_ROOT_CONFIG,
                removeUserInfoFunc = _ref2.removeUserInfoFunc;

            if (API_URL[ApiName].showLoading) {
                _antdMobile.Toast.loading('loading...', 0, function () {}, true);
            }
            if (API_URL[ApiName].method == "GET") {
                return FetchDataModule.get({ ApiName: ApiName, params: params, API_URL: API_URL, headers: headers, APP_ROOT_CONFIG: APP_ROOT_CONFIG, removeUserInfoFunc: removeUserInfoFunc });
            } else if (API_URL[ApiName].method == "POST") {
                return FetchDataModule.post({ ApiName: ApiName, params: params, API_URL: API_URL, headers: headers, APP_ROOT_CONFIG: APP_ROOT_CONFIG, removeUserInfoFunc: removeUserInfoFunc });
            } else {
                _antdMobile.Modal.alert("接口预定义信息错误", "\u63A5\u53E3\u540D:" + ApiName + "\b" + "\u9519\u8BEF\u7C7B\u578B:\u8BF7\u6C42\u65B9\u5F0F\u5F02\u5E38", [{
                    text: "查看接口描述",
                    onPress: function onPress() {
                        console.warn("\u63A5\u53E3\u9884\u5B9A\u4E49\u4FE1\u606F\u9519\u8BEF\u7684\u63A5\u53E3\u63CF\u8FF0:" + API_URL[ApiName].remark);
                    }
                }, {
                    text: "查看接口地址",
                    onPress: function onPress() {
                        console.warn("\u63A5\u53E3\u9884\u5B9A\u4E49\u4FE1\u606F\u9519\u8BEF\u7684\u63A5\u53E3\u5730\u5740:" + API_URL[ApiName].fetchUrl);
                    }
                }, {
                    text: "确定",
                    onPress: function onPress() {
                        console.warn("请处理错误接口");
                    }
                }]);
            }
        }

        /*
         *  GET请求
        */

    }, {
        key: "get",
        value: function get(_ref3) {
            var ApiName = _ref3.ApiName,
                params = _ref3.params,
                API_URL = _ref3.API_URL,
                headers = _ref3.headers,
                APP_ROOT_CONFIG = _ref3.APP_ROOT_CONFIG,
                removeUserInfoFunc = _ref3.removeUserInfoFunc;

            return fetch(API_URL[ApiName].fetchUrl + "?" + toQueryString(params), {
                method: "GET",
                headers: headers
            }).then(function (res) {
                return FetchDataModule.HandleRequestResults({
                    res: res,
                    ApiName: ApiName,
                    params: params,
                    API_URL: API_URL,
                    APP_ROOT_CONFIG: APP_ROOT_CONFIG,
                    removeUserInfoFunc: removeUserInfoFunc,
                    headers: headers
                });
            }).catch(function (error) {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            });
        }

        /*
         *  POST请求
        */

    }, {
        key: "post",
        value: function post(_ref4) {
            var ApiName = _ref4.ApiName,
                params = _ref4.params,
                API_URL = _ref4.API_URL,
                headers = _ref4.headers,
                APP_ROOT_CONFIG = _ref4.APP_ROOT_CONFIG,
                removeUserInfoFunc = _ref4.removeUserInfoFunc;

            return fetch(API_URL[ApiName].fetchUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(params)
            }).then(function (res) {
                return FetchDataModule.HandleRequestResults({
                    res: res,
                    ApiName: ApiName,
                    params: params,
                    API_URL: API_URL,
                    APP_ROOT_CONFIG: APP_ROOT_CONFIG,
                    removeUserInfoFunc: removeUserInfoFunc,
                    headers: headers
                });
            }).catch(function (error) {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            });
        }

        /*
         *  处理请求结果
        */

    }, {
        key: "HandleRequestResults",
        value: function HandleRequestResults(_ref5) {
            var res = _ref5.res,
                ApiName = _ref5.ApiName,
                params = _ref5.params,
                API_URL = _ref5.API_URL,
                APP_ROOT_CONFIG = _ref5.APP_ROOT_CONFIG,
                removeUserInfoFunc = _ref5.removeUserInfoFunc,
                headers = _ref5.headers;

            if (API_URL[ApiName].showLoading) {
                _antdMobile.Toast.hide();
            }
            if (!res.ok) {
                if (APP_ROOT_CONFIG.env.showNetWorkErrorInfo) {
                    res.text().then(function (err) {
                        _antdMobile.Modal.alert("接口请求错误", "\u63A5\u53E3\u540D:" + API_URL[ApiName].apiUrl, [{
                            text: "上报接口异常",
                            onPress: function onPress() {
                                FetchDataModule.ErrorApiFetch({
                                    ApiName: ApiName,
                                    err: err,
                                    params: params,
                                    API_URL: API_URL,
                                    APP_ROOT_CONFIG: APP_ROOT_CONFIG,
                                    headers: headers
                                });
                            }
                        }, { text: "查看报错信息", onPress: function onPress() {
                                return console.warn(err);
                            } }, { text: "确定", onPress: function onPress() {} }]);
                    });
                }
                if (APP_ROOT_CONFIG.env.defaultUploadNetWorkErrorInfo) {
                    _antdMobile.Toast.info('捕获到服务器返回数据类型异常，正在自动提交错误信息');
                    res.text().then(function (e) {
                        FetchDataModule.ErrorApiFetch({
                            ApiName: ApiName,
                            e: e,
                            params: params,
                            API_URL: API_URL,
                            APP_ROOT_CONFIG: APP_ROOT_CONFIG,
                            headers: headers
                        });
                    });
                }
                return new Promise(function (resolve, reject) {
                    reject();
                });
            } else {
                return res.json().then(function (res) {
                    return new Promise(function (resolve) {
                        if (res.errcode != -999) {
                            resolve(res);
                        } else {
                            _antdMobile.Toast.info("token验证异常，请重新登录");
                            removeUserInfoFunc && removeUserInfoFunc();
                        }
                    });
                });
            }
        }

        /*
         *  微信专用请求
        */

    }, {
        key: "wechat",
        value: function wechat(url, params, callback) {
            fetch(url + "?" + toQueryString(params), {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                callback(data);
            }).catch(function (error) {
                console.warn(error);
            });
        }

        //  /*
        //   *  检索 url code
        //  */
        //   static GetRequest() {
        //     let url = location.search; //获取url中"?"符后的字串
        //     let theRequest = new Object();
        //     if (url.indexOf("?") != -1) {
        //       let str = url.substr(1);
        //       let strs = str.split("&");
        //       for(var i = 0; i < strs.length; i ++) {
        //         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        //       }
        //     }
        //     return theRequest;
        //   }


        /*
         *  请求错误处理
        */

    }, {
        key: "ErrorApiFetch",
        value: function ErrorApiFetch(_ref6) {
            var ApiName = _ref6.ApiName,
                errmsg = _ref6.errmsg,
                params = _ref6.params,
                API_URL = _ref6.API_URL,
                APP_ROOT_CONFIG = _ref6.APP_ROOT_CONFIG,
                headers = _ref6.headers;

            var errorApiDeveloper = developerVerification(API_URL[ApiName].developer, APP_ROOT_CONFIG);
            fetch(APP_ROOT_CONFIG.errorCollectApi, {
                method: "POST",
                headers: headers,
                body: toQueryString({
                    project: "" + APP_ROOT_CONFIG.AppName + APP_ROOT_CONFIG.AppPlatform + "\u7AEF",
                    post_author: APP_ROOT_CONFIG.errorApiDeveloper.name,
                    server_return: errmsg,
                    api_address: API_URL[ApiName].method + ":" + API_URL[ApiName].fetchUrl + "?" + toQueryString(params),
                    api_author: API_URL[ApiName].author
                })
            }).then(function (res) {
                if (!res.ok) {
                    _antdMobile.Modal.alert("提交错误的接口都报错了", "\u80BF\u4E48\u529E\uFF8D(;\xB4\u0414\uFF40\uFF8D)", [{
                        text: "GG",
                        onPress: function onPress() {
                            _antdMobile.Toast.warn('你选择了GG');
                        }
                    }, {
                        text: "人肉联系开发人员",
                        onPress: function onPress() {
                            _antdMobile.Modal.alert("\u63A5\u53E3\u7684\u4F7F\u7528\u8005\u662F " + APP_ROOT_CONFIG.errorApiDeveloper.name, '是否要拨打电话联系开发者', [{
                                text: '取消',
                                onPress: function onPress() {}
                            }, {
                                text: '拨打',
                                onPress: function onPress() {
                                    //  Linking.openURL(`tel:${errorApiDeveloper.phone}`).catch(err => console.warn('拨打电话失败，请检查当前环境'));
                                }
                            }]);
                        }
                    }, {
                        text: "确定",
                        onPress: function onPress() {}
                    }]);
                } else {
                    res.json().then(function (e) {
                        _antdMobile.Toast.info("服务器异常提交成功");
                    });
                }
            });
        }
    }]);

    return FetchDataModule;
}();

// 获取开发者信息


exports.default = FetchDataModule;
var developerVerification = function developerVerification(developerName, APP_ROOT_CONFIG) {
    if (developerName) {
        if (APP_ROOT_CONFIG.developer.allDeveloper[developerName]) {
            return APP_ROOT_CONFIG.developer.allDeveloper[developerName];
        } else {
            _antdMobile.Toast.error('检测到定义了错误的接口开发者，请审查APP_ROOT_NETWORK_CONFIG');
            return APP_ROOT_CONFIG.developer.main;
        }
    } else {
        return APP_ROOT_CONFIG.developer.main;
    }
};

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + "[]=" + encodeURIComponent(val2);
            }).join("&");
        }
        if (val) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(val);
        } else {
            return encodeURIComponent(key) + "=";
        }
    }).join("&") : "";
}