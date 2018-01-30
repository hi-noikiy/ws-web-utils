import "isomorphic-fetch";
import {libraryConfig} from "../libraryConfig";



 export default class FetchDataModule {
     /*
      *  请求入口
     */
     static fetch({apiName, params}) {
         const {
             API_URL,
             getLoginFunc,
             pushLoginFunc,
             Modal,
         } = libraryConfig
         const login = getLoginFunc()
         if (apiName) {
             if (API_URL[apiName].needLogin) {
                 if (login) {
                    return this.fetchData({apiName, params});
                 } else {
                    return new Promise(() => {
                        pushLoginFunc && pushLoginFunc()
                    });
                 }
             } else {
                 return this.fetchData({apiName, params});
             }
         } else {
             Modal.warning({title:'FetchDataModule模块调用异常，请检查传递参数'});
         }
     }

     /*
      *  处理请求的接口
     */
     static fetchData({apiName, params}) {
         const {
             API_URL,
             Toast,
             Modal,
         } = libraryConfig
         if (API_URL[apiName].showLoading) {
             Toast.loading('loading...', 0)
         }
         if (API_URL[apiName].method == "GET") {
             return this.get({apiName, params})
         } else if (API_URL[apiName].method == "POST") {
             return this.post({apiName, params})
         } else {
             Modal.alert("接口预定义信息错误", `接口名:${apiName}${"\b"}错误类型:请求方式异常`, [
                 {
                     text: "查看接口描述",
                     onPress: () => {
                         console.warn(
                             `接口预定义信息错误的接口描述:${API_URL[apiName].remark}`
                         );
                     }
                 },
                 {
                     text: "查看接口地址",
                     onPress: () => {
                         console.warn(
                             `接口预定义信息错误的接口地址:${API_URL[apiName].fetchUrl}`
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
     static get({apiName, params}) {
         const {
             API_URL,
             getHeadersFunc,
         } = libraryConfig
         const {
             mock,
             fetchUrl,
             mockFetchUrl,
         } = API_URL[apiName]
         return fetch(mock?mockFetchUrl:fetchUrl + "?" + toQueryString(params), {
             method: "GET",
             headers: Object.assign({},mock?{}:getHeadersFunc(),{"Content-Type": "application/x-www-form-urlencoded"}),
         })
         .then(res => {
             return this.HandleRequestResults({
                 res,
                 apiName,
                 params,
             });
         })
         // .catch(error => {
         //     return new Promise((resolve, reject) => {reject(error)});
         // });
     }

     /*
      *  POST请求
     */
     static post({apiName, params}) {
         const {
             API_URL,
             getHeadersFunc,
         } = libraryConfig
         const {
             mock,
             fetchUrl,
             mockFetchUrl,
         } = API_URL[apiName]
         return fetch(mock?mockFetchUrl:fetchUrl, {
             method: "POST",
             headers: Object.assign({},mock?{}:getHeadersFunc(),{"Content-Type": "application/json"}),
             body: JSON.stringify(params)
         })
         .then(res => {
             return this.HandleRequestResults({
                 res,
                 apiName,
                 params,
             });
         })
         // .catch(error => {
         //     return new Promise((resolve, reject) => {reject(error)});
         // });
     }

     /*
      *  处理请求结果
     */
     static HandleRequestResults({res, apiName, params}) {
         const {
             API_URL,
             hideLoading,
             APP_ROOT_CONFIG,
             ToastError,
             removeUserInfoFunc,
             Toast,
             Modal,
         } = libraryConfig
         const {
             env
         } = APP_ROOT_CONFIG
         if (API_URL[apiName].showLoading) {
             Toast.hide();
         }
         if (!res.ok) {
             if(env.showNetWorkErrorInfo){
                 res.text()
                 .then(errmsg => {
                     Modal.alert(
                         "接口请求错误", `接口名:${API_URL[apiName].apiUrl}`,
                         [
                             {
                                 text: "上报接口异常",
                                 onPress: () => {
                                     this.ErrorApiFetch({
                                         apiName,
                                         errmsg,
                                         params,
                                     });
                                 }
                             },
                             { text: "查看报错信息", onPress: () => console.warn(errmsg) },
                             { text: "确定", onPress: () => {} }
                         ]
                     );
                 });
             }
             if(env.defaultUploadNetWorkErrorInfo){
                 Toast.info('捕获到服务器返回数据类型异常，正在自动提交错误信息');
                 res.text().then(errmsg => {
                     this.ErrorApiFetch({
                         apiName,
                         errmsg,
                         params,
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
             return new Promise(resolve=>resolve(data))
         })
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
     static ErrorApiFetch({apiName, errmsg}) {
         const {
             API_URL,
             APP_ROOT_CONFIG,
             Toast,
             getHeadersFunc,
             Modal,
         } = libraryConfig
         const {
             developer,
             errorCollectApi,
             AppName,
             AppPlatform,
         } = APP_ROOT_CONFIG

         const errorApiDeveloper = developerVerification(API_URL[apiName].developer,APP_ROOT_CONFIG)
         fetch(APP_ROOT_CONFIG.errorCollectApi, {
             method: "POST",
             headers: Object.assign({},headers,{"Content-Type": "application/json"}),
             body: toQueryString({
                 project: `${APP_ROOT_CONFIG.AppName}${APP_ROOT_CONFIG.AppPlatform}端`,
                 post_author: APP_ROOT_CONFIG.errorApiDeveloper.name,
                 server_return: errmsg,
                 api_address: `${API_URL[apiName].method}:${API_URL[apiName].fetchUrl}?${toQueryString(params)}`,
                 api_author: API_URL[apiName].author
             })
         })
         .then(res => {
             if (!res.ok) {
                 Modal.alert("提交错误的接口都报错了", `肿么办ﾍ(;´Д｀ﾍ)`, [
                     {
                         text: "GG",
                         onPress: () => {Toast.warning('你选择了GG')}
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
