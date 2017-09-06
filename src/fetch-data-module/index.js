import "isomorphic-fetch";
import {Toast,Modal} from "antd-mobile";


 export default class FetchDataModule {
     /*
      *  请求入口
     */
     static fetch({ApiName, params, API_URL, login, pushLoginFunc, headers, APP_ROOT_CONFIG, removeUserInfoFunc}) {
         if (ApiName) {
             if (API_URL[ApiName].needLogin) {
                 if (login) {
                    return FetchDataModule.fetchData({ApiName, params, API_URL, headers, APP_ROOT_CONFIG, removeUserInfoFunc});
                 } else {
                    return new Promise(() => {
                        pushLoginFunc && pushLoginFunc()
                    });
                 }
             } else {
                 return FetchDataModule.fetchData({ApiName, params, API_URL, headers, APP_ROOT_CONFIG, removeUserInfoFunc});
             }
         } else {
             Modal.alert("FetchDataModule模块调用异常，请检查传递参数");
         }
     }

     /*
      *  处理请求的接口
     */
     static fetchData({ApiName, params, API_URL, headers, APP_ROOT_CONFIG, removeUserInfoFunc}) {
         if (API_URL[ApiName].showLoading) {
             Toast.loading('loading...', 0, ()=>{}, true)
         }
         if (API_URL[ApiName].method == "GET") {
             return FetchDataModule.get({ApiName, params, API_URL, headers, APP_ROOT_CONFIG, removeUserInfoFunc})
         } else if (API_URL[ApiName].method == "POST") {
             return FetchDataModule.post({ApiName, params, API_URL, headers, APP_ROOT_CONFIG, removeUserInfoFunc})
         } else {
             Modal.alert("接口预定义信息错误", `接口名:${ApiName}${"\b"}错误类型:请求方式异常`, [
                 {
                     text: "查看接口描述",
                     onPress: () => {
                         console.warn(
                             `接口预定义信息错误的接口描述:${API_URL[ApiName].remark}`
                         );
                     }
                 },
                 {
                     text: "查看接口地址",
                     onPress: () => {
                         console.warn(
                             `接口预定义信息错误的接口地址:${API_URL[ApiName].fetchUrl}`
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
     static get({ApiName, params, API_URL, headers, APP_ROOT_CONFIG, removeUserInfoFunc}) {
         return fetch(API_URL[ApiName].fetchUrl + "?" + toQueryString(params), {
             method: "GET",
             headers: Object.assign({},headers,{"Content-Type": "application/x-www-form-urlencoded"}),
         })
             .then(res => {
                 return FetchDataModule.HandleRequestResults({
                     res,
                     ApiName,
                     params,
                     API_URL,
                     APP_ROOT_CONFIG,
                     removeUserInfoFunc,
                     headers,
                 });
             })
             .catch(error => {
                 return new Promise((resolve, reject) => {reject(error)});
             });
     }

     /*
      *  POST请求
     */
     static post({ApiName, params, API_URL, headers, APP_ROOT_CONFIG, removeUserInfoFunc}) {
         return fetch(API_URL[ApiName].fetchUrl, {
             method: "POST",
             headers: Object.assign({},headers,{"Content-Type": "application/json"}),
             body: JSON.stringify(params)
         })
             .then(res => {
                 return FetchDataModule.HandleRequestResults({
                     res,
                     ApiName,
                     params,
                     API_URL,
                     APP_ROOT_CONFIG,
                     removeUserInfoFunc,
                     headers,
                 });
             })
             .catch(error => {
                 return new Promise((resolve, reject) => {reject(error)});
             });
     }

     /*
      *  处理请求结果
     */
     static HandleRequestResults({res, ApiName, params, API_URL, APP_ROOT_CONFIG, removeUserInfoFunc, headers}) {
         if (API_URL[ApiName].showLoading) {
             Toast.hide();
         }
         if (!res.ok) {
             if(APP_ROOT_CONFIG.env.showNetWorkErrorInfo){
                 res.text()
                 .then(err => {
                     Modal.alert(
                         "接口请求错误", `接口名:${API_URL[ApiName].apiUrl}`,
                         [
                             {
                                 text: "上报接口异常",
                                 onPress: () => {
                                     FetchDataModule.ErrorApiFetch({
                                         ApiName,
                                         err,
                                         params,
                                         API_URL,
                                         APP_ROOT_CONFIG,
                                         headers,
                                     });
                                 }
                             },
                             { text: "查看报错信息", onPress: () => console.warn(err) },
                             { text: "确定", onPress: () => {} }
                         ]
                     );
                 });
             }
             if(APP_ROOT_CONFIG.env.defaultUploadNetWorkErrorInfo){
                 Toast.info('捕获到服务器返回数据类型异常，正在自动提交错误信息');
                 res.text().then(e => {
                     FetchDataModule.ErrorApiFetch({
                         ApiName,
                         e,
                         params,
                         API_URL,
                         APP_ROOT_CONFIG,
                         headers,
                     });
                 });
             }
             return new Promise((resolve, reject) => {reject()});
         } else {
             return res
                 .json()
                 .then(res => {
                     return new Promise(resolve => {
                         if (res.errcode != -999) {
                             resolve(res);
                         } else {
                             Toast.info("token验证异常，请重新登录");
                             removeUserInfoFunc && removeUserInfoFunc()
                         }
                     });
                 })
         }
     }

     /*
      *  微信专用请求
     */
     static wechat(url, params, callback) {
         fetch(url + "?" + toQueryString(params), {
             method: "GET",
             headers: {
                 "Content-Type": "application/x-www-form-urlencoded"
             }
         })
             .then(res => res.json())
             .then(data => {
                 callback(data);
             })
             .catch(error => {
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
     static ErrorApiFetch({ApiName, errmsg, params, API_URL, APP_ROOT_CONFIG, headers}) {
         const errorApiDeveloper = developerVerification(API_URL[ApiName].developer,APP_ROOT_CONFIG)
         fetch(APP_ROOT_CONFIG.errorCollectApi, {
             method: "POST",
             headers: Object.assign({},headers,{"Content-Type": "application/json"}),
             body: toQueryString({
                 project: `${APP_ROOT_CONFIG.AppName}${APP_ROOT_CONFIG.AppPlatform}端`,
                 post_author: APP_ROOT_CONFIG.errorApiDeveloper.name,
                 server_return: errmsg,
                 api_address: `${API_URL[ApiName].method}:${API_URL[ApiName].fetchUrl}?${toQueryString(params)}`,
                 api_author: API_URL[ApiName].author
             })
         })
         .then(res => {
             if (!res.ok) {
                 Modal.alert("提交错误的接口都报错了", `肿么办ﾍ(;´Д｀ﾍ)`, [
                     {
                         text: "GG",
                         onPress: () => {Toast.warn('你选择了GG')}
                     },{
                         text: "人肉联系开发人员",
                         onPress: () => {
                             Modal.alert(
                                 `接口的使用者是 ${APP_ROOT_CONFIG.errorApiDeveloper.name}`,
                                 '是否要拨打电话联系开发者',
                                 [
                                     {
                                         text: '取消',
                                         onPress: () => {}
                                     },
                                     {
                                         text: '拨打',
                                         onPress: () => {
                                            //  Linking.openURL(`tel:${errorApiDeveloper.phone}`).catch(err => console.warn('拨打电话失败，请检查当前环境'));
                                         }
                                     },
                                 ]
                             )
                         }
                     },{
                         text: "确定",
                         onPress: () => {}
                     }
                 ]);
             }else {
                 res.json()
                 .then(e => {
                     Toast.info("服务器异常提交成功");
                 })
             }
         })
     }
 }



 // 获取开发者信息
 const developerVerification = (developerName,APP_ROOT_CONFIG)=>{
     if(developerName){
         if(APP_ROOT_CONFIG.developer.allDeveloper[developerName]){
             return APP_ROOT_CONFIG.developer.allDeveloper[developerName]
         }else {
             Toast.error('检测到定义了错误的接口开发者，请审查APP_ROOT_NETWORK_CONFIG')
             return APP_ROOT_CONFIG.developer.main
         }
     }else {
         return APP_ROOT_CONFIG.developer.main
     }
 }


 function toQueryString(obj) {
     return obj
         ? Object.keys(obj)
               .sort()
               .map(function(key) {
                   var val = obj[key];
                   if (Array.isArray(val)) {
                       return val
                           .sort()
                           .map(function(val2) {
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
