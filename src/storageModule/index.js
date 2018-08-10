import { config } from "../config";

const storageString = (storageString) => {
    if (storageString && typeof(storageString) === 'string') {
        return `${storageString}`
    } else {
        config.ToastError('localStorage存储键名异常');
    }
}

export default class StorageModule {
    static getUserInfo() {
        return localStorage.getItem(storageString('userInfo'))
    }

    static setUserInfo(historyItem) {
        return localStorage.setItem(storageString('userInfo'), JSON.stringify(historyItem))
    }

    static removeUserInfo() {
        return localStorage.removeItem(storageString('userInfo'))
    }

    static set(key, value) {
        return localStorage.setItem(storageString(key.toString()), value)
    }

    static get(e) {
        return localStorage.getItem(storageString(e))
    }

    static removeItem(key) {
        return localStorage.removeItem(storageString(key))
    }
}
