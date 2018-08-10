let config = {
    ToastInfo: (content, duration, onClose, mask) => {
        alert('未设置 ToastInfo 方法')
    },
    ToastError: (content, duration, onClose, mask) => {
        alert('未设置 ToastError 方法')
    },
    ToastWarn: (content, duration, onClose, mask) => {
        alert('未设置 ToastWarn 方法')
    },
    ToastLoading: (content, duration, onClose, mask) => {
        alert('未设置 ToastLoading 方法')
    },
    ToastHide: () => {
        alert('未设置 ToastHide 方法')
    },
    ModalAlert: () => {
        alert('未设置 ModalAlert 方法')
    },
    API_URL: null,
    getLogin: () => {
        alert('未设置 getLogin 方法')
    },
    pushLogin: () => {
        alert('未设置 pushLogin 方法')
    },
    APP_ROOT_CONFIG: null,
    removeUserInfoFunc: () => {
        alert('未设置 removeUserInfoFunc 方法')
    },
    showLoading: () => {
        alert('未设置 showLoading 方法')
    },
    hideLoading: () => {
        alert('未设置 hideLoading 方法')
    },
    getHeaders: () => {
        alert('未设置 getHeaders 方法')
    },
}

const initLibraryConfigFunc = (e = {}) => {
    config = Object.assign({}, config, e)
}

export {
    config,
    initLibraryConfigFunc
}
