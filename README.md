# ws-web-utils

Can only be used internally for the project

## Install

```bash
$ npm install --save ws-web-utils
```

## API

`stateHoc([options])(Component)`

 stateHoc是一个高阶组件，用于处理业务组件的等待、请求、异常处理显示等...

`[options] (Object)`

*  `Loading` \(_Class/Func_\): loading状态下的显示组件
*  `Failure` \(_Class/Func_\): failure状态下的显示组件
* `Error` \(_Class/Func_\): error状态下的显示组件
* `NullData` \(_Class/Func_\): nullData状态下的显示组件
*  `detail`  \(_Boolean_\): 如果 true ，则会通过 `hocDetailKey` 来获得`key`值用来处理渲染判断
* `hocDetailKey` \(_Function_\): 要求返回一个`string`类型的值，这个值是`props.fetchStatus`的渲染键名
* `fetchStatus` \(_String or Object_\):

  `default`模式下要求是`string`类型，遵循`fetchStatus`渲染规则\(如下\)。  
  `detail`模式下要求是`object`类型，取`object[key]`来用于判断渲染，遵循`fetchStatus`渲染规则\(如下\)

* `hocNullDataFunc` \(_Function_\): 默认`null`，如果设置，则需要返回一个`boolean`值，用于判断是否显示`NullData`组件

## Component

 子组件下的成员方法

* `hocComponentDidMount` \(_Function_\): 如果存在，会在高级组件的render后像`componentDidMount`一样的生命周期执行,常用语fetch请求等

---

##### Examples

```js
import {stateHoc,fetchStatus} from 'ws-web-utils'
import { connect } from "react-redux";

//默认模式
@connect(()=>({
    fetchStatus: fetchStatus.s
}))
@stateHoc()
class HourseDetail extends Component{
    hocComponentDidMount() {
        //todo more
    }
    render(){
        return <div>success</div>
    }
}

//detail模式
@connect(()=>({
    fetchStatus: {
        '1': fetchStatus.s
    }
}))
@stateHoc({
    detail: true
})
class HourseDetail extends Component{
    hocDetailKey(){
        return '1'
    }
    hocComponentDidMount() {
        //todo fetch
    }
    render(){
        return <div>success</div>
    }
}
```

## `fetchStatus` \(_Object_\)

* ##### `l`  loading
* ##### `f`  failure
* ##### `e`  error
* ##### `s`  success

---

##### Examples

```js
import {fetchStatus} from 'ws-web-utils'
console.log(fetchStatus)
/*
    {
        l: 'loading',
        f: 'failuer',
        e: 'error',
        s: 'success',
    }
*/
```

## fetchStatus渲染规则

* `fetchStatus.l` render  **Loading**
* `fetchStatus.f` render  **Failure**
* `fetchStatus.e` render  **Error**
* `fetchStatus.s` render  **包裹的组件**

#### 

####

#### 废旧文档 \(忽略以下\)

---

## stateHoc API \(props , params\)

### `options` Config

| Param | Default | Type | Description |
| :--- | :---: | :---: | :--- |
| Loading | `Loading` | `Class/Func` | 等待状态 |
| Failure | `Failure` | `Class/Func` | 失败状态 |
| Error | `Error` | `Class/Func` | 错误状态 |
| detail | `false` | `Boolean` | 使用场景是多个state |
| keyFunc | `undefined` | `Func` | detail==true时有效，捆绑key生效 |
| key | `undefined` | `String` | detail==true时有效，取值唯一标识 |
| height | `undefined` | `Number` | LoadingView的height props |

### Props Config

| Prop | Default | Type | Description |
| :--- | :---: | :---: | :--- |
| fetchStatus | `undefined` | `String` | 详见内部FetchStatus |
| orther props | `...this.props` | `Object` | ... |



 