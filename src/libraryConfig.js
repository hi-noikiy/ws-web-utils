
let libraryConfig = {
    ToastInfo: (content, duration, onClose, mask)=>{
        alert('未设置 ToastInfo 方法')
    },
    ToastError: (content, duration, onClose, mask)=>{
        alert('未设置 ToastError 方法')
    },
    ToastWarn: (content, duration, onClose, mask)=>{
        alert('未设置 ToastWarn 方法')
    },
    ToastLoading: (content, duration, onClose, mask)=>{
        alert('未设置 ToastLoading 方法')
    },
    ToastHide: ()=>{
        alert('未设置 ToastHide 方法')
    },
    ModalAlert: ()=>{
        alert('未设置 ModalAlert 方法')
    },
}

const initLibraryConfigFunc = (e={})=>{
    libraryConfig = Object.assign({},libraryConfig,e)
}


export{
    libraryConfig,
    initLibraryConfigFunc
}
