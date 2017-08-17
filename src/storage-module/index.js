import { Toast } from 'antd-mobile';

const storageString = (storageString)=>{
    if (storageString && typeof(storageString)=='string') {
        return `${storageString}`
    } else {
        Toast.info('localStorage存储键名异常');
    }
}

export default class StorageModule{
    static _getUserInfo(){
        return localStorage.getItem(storageString('userInfo'))
    }
    static _setUserInfo(historyItem){
    	return localStorage.setItem(storageString('userInfo'),JSON.stringify(historyItem))
    }
    static _removeUserInfo(){
    	return localStorage.removeItem(storageString('userInfo'))
    }
    static set(key,value){
    	return localStorage.setItem(storageString(key.toString()),value)
    }
    static get(e){
    	return localStorage.getItem(storageString(e))
    }
    static _removeItem(key){
    	return localStorage.removeItem(storageString(key))
    }
}


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
