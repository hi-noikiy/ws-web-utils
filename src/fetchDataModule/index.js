import "isomorphic-fetch";
import { config } from "../config";

export default class FetchDataModule {
    /*
     *  请求入口
    */
    static fetch({ api, params }) {
        const {
            getLogin,
            pushLogin,
            Modal,
        } = config
        const login = getLogin()
        if (api) {
            if (api.needLogin) {
                if (login) {
                    return this.fetchData({ api, params });
                } else {
                    return new Promise(() => {
                        pushLogin && pushLogin()
                    });
                }
            } else {
                return this.fetchData({ api, params });
            }
        } else {
            Modal.warning({ title: 'FetchDataModule模块调用异常，请检查传递参数' });
        }
    }

    /*
     *  处理请求的接口
    */
    static fetchData({ api, params }) {
        const { Modal, showLoading, } = config
        if (api.showLoading) {
            showLoading()
        }
        if (api.method === "GET") {
            return this.get({ api, params })
        } else if (api.method === "POST") {
            return this.post({ api, params })
        } else {
            Modal.alert("接口预定义信息错误", `接口名:${api.url}${"\b"}错误类型:请求方式异常`, [
                {
                    text: "查看接口地址",
                    onPress: () => {
                        console.warn(
                            `接口预定义信息错误的接口地址:${api.url}`
                        );
                    }
                },
                {
                    text: "确定",
                    onPress: () => {
                        console.warn("请处理错误接口");
                    }
                }
            ]);
        }
    }

    /*
     *  GET请求
    */
    static get({ api, params }) {
        const { getHeaders } = config
        const {
            mock,
            url,
            mockUrl,
        } = api
        return fetch(mock ? mockUrl : url + "?" + toQueryString(params), {
            method: "GET",
            headers: Object.assign({}, mock ? {} : getHeaders(), { "Content-Type": "application/x-www-form-urlencoded" }),
        })
            .then(res => {
                return this.handleRequestResults({
                    res,
                    api,
                    params,
                });
            })

    }
    /*
     *  POST请求
    */
    static post({ api, params }) {
        const { getHeaders } = config
        const {
            mock,
            url,
            mockUrl,
        } = api
        return fetch(mock ? mockUrl : url, {
            method: "POST",
            headers: Object.assign({}, mock ? {} : getHeaders(), { "Content-Type": "application/json" }),
            body: JSON.stringify(params)
        })
            .then(res => {
                return this.handleRequestResults({
                    res,
                    api,
                    params,
                });
            })
    }

    /*
     *  处理请求结果
    */
    static handleRequestResults({ res, api, params }) {
        const {
            APP_ROOT_CONFIG,
            removeUserInfoFunc,
            Toast,
            Modal,
            hideLoading,
        } = config
        const {
            env
        } = APP_ROOT_CONFIG
        if (api.showLoading) {
            hideLoading()
        }
        if (!res.ok) {
            if (env.showNetWorkErrorInfo) {
                res.text()
                    .then(errmsg => {
                        Modal.alert(
                            "接口请求错误", `接口名:${api.apiUrl}`,
                            [
                                {
                                    text: "上报接口异常",
                                    onPress: () => {
                                        this.ErrorApiFetch({
                                            api,
                                            errmsg,
                                            params,
                                        });
                                    }
                                },
                                { text: "查看报错信息", onPress: () => console.warn(errmsg) },
                                {
                                    text: "确定", onPress: () => {
                                    }
                                }
                            ]
                        );
                    });
            }
            if (env.defaultUploadNetWorkErrorInfo) {
                Toast.info('捕获到服务器返回数据类型异常，正在自动提交错误信息');
                res.text().then(errmsg => {
                    this.ErrorApiFetch({
                        api,
                        errmsg,
                        params,
                    });
                });
            }
            return new Promise((resolve, reject) => {
                reject()
            });
        } else {
            return res
                .json()
                .then(res => {
                    return new Promise(resolve => {
                        if (res.errcode !== -999) {
                            resolve(res);
                        } else {
                            Toast.error("token验证异常，请重新登录");
                            removeUserInfoFunc()
                        }
                    });
                })
        }
    }

    /*
     *  微信专用请求
    */
    static wechat(url, params, callback) {
        return fetch(url + "?" + toQueryString(params), {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res => res.json())
            .then(data => {
                return new Promise(resolve => resolve(data))
            })
    }

    /*
     *  请求错误处理
    */
    static ErrorApiFetch({ api, errmsg }) {
        const {
            APP_ROOT_CONFIG,
            Toast,
            Modal,
        } = config

        fetch(APP_ROOT_CONFIG.errorCollectApi, {
            method: "POST",
            headers: Object.assign({}, headers, { "Content-Type": "application/json" }),
            body: toQueryString({
                project: `${APP_ROOT_CONFIG.AppName}${APP_ROOT_CONFIG.AppPlatform}端`,
                server_return: errmsg,
                api_address: `${api.method}:${api.url}?${toQueryString(params)}`,
            })
        })
            .then(res => {
                if (!res.ok) {
                    Modal.alert("提交错误的接口都报错了", `肿么办ﾍ(;´Д｀ﾍ)`, [
                        {
                            text: "GG",
                            onPress: () => {
                                Toast.warning('你选择了GG')
                            }
                        }, {
                            text: "人肉联系开发人员",
                            onPress: () => {
                                Modal.alert(
                                    `接口的使用者是 ${APP_ROOT_CONFIG.errorApiDeveloper.name}`,
                                    '是否要拨打电话联系开发者',
                                    [
                                        {
                                            text: '取消',
                                            onPress: () => {
                                            }
                                        },
                                        {
                                            text: '拨打',
                                            onPress: () => {
                                            }
                                        },
                                    ]
                                )
                            }
                        }, {
                            text: "确定",
                            onPress: () => {
                            }
                        }
                    ]);
                } else {
                    res.json()
                        .then(e => {
                            Toast.info("服务器异常提交成功");
                        })
                }
            })
    }
}

function toQueryString(obj) {
    return obj
        ? Object.keys(obj)
            .sort()
            .map(function (key) {
                var val = obj[key];
                if (Array.isArray(val)) {
                    return val
                        .sort()
                        .map(function (val2) {
                            return encodeURIComponent(key) +
                                "[]=" +
                                encodeURIComponent(val2);
                        })
                        .join("&");
                }
                if (val) {
                    return encodeURIComponent(key) +
                        "=" +
                        encodeURIComponent(val);
                } else {
                    return encodeURIComponent(key) + "=";
                }
            })
            .join("&")
        : "";
}
