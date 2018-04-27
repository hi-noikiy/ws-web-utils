# ws-web-utils

Can only be used internally for the project

## Installation

```bash
$ npm install --save ws-web-utils
```

## **API**

## `stateHoc([options])`

#### stateHoc是一个高阶组件，用于处理业务组件的等待、请求、异常处理显示等...

#### `[options] (Object)`

* ##### `LoadingView` \(_Class/Func_\): loading状态下的显示组件
* ##### `FailureView` \(_Class/Func_\): failure状态下的显示组件
* ##### `ErrorView` \(_Class/Func_\): error状态下的显示组件
* ##### `NullDataView` \(_Class/Func_\): nullData状态下的显示组件
* ##### `detail`  \(_Boolean_\): 如果 true ，则会通过 `hocDetailKey` 来获得`key`值用来处理渲染判断
* ##### `hocDetailKey` \(_Function_\): 要求返回一个`string`类型的值，这个值是`props.fetchStatus`的渲染键名
* ##### `fetchStatus` \(_String or Object_\):

  `default`模式下要求是`string`类型，遵循`fetchStatus`渲染规则\(如下\)。  
  `detail`模式下要求是`object`类型，取`object[key]`来用于判断渲染，遵循`fetchStatus`渲染规则\(如下\)

* ##### `hocNullDataFunc` \(_Function_\): 默认`null`，如果设置，则需要返回一个`boolean`值，用于判断是否显示`NullDataView`组件

## `fetchStatus` \(_Object_\)

* ##### `l`  loading
* ##### `f`  failure
* ##### `e`  error
* ##### `s`  success

## `fetchStatus`渲染规则

* `fetchStatus.l` render  **LoadingView**
* `fetchStatus.f` render  **FailureView**
* `fetchStatus.e` render  **ErrorView**
* `fetchStatus.s` render  **包裹的组件**

#### 废旧文档 \(忽略以下\)

---

## stateHoc API \(props , params\)

### `options` Config

| Param | Default | Type | Description |
| :--- | :---: | :---: | :--- |
| LoadingView | `LoadingView` | `Class/Func` | 等待状态 |
| FailureView | `FailureView` | `Class/Func` | 失败状态 |
| ErrorView | `ErrorView` | `Class/Func` | 错误状态 |
| detail | `false` | `Boolean` | 使用场景是多个state |
| keyFunc | `undefined` | `Func` | detail==true时有效，捆绑key生效 |
| key | `undefined` | `String` | detail==true时有效，取值唯一标识 |
| height | `undefined` | `Number` | LoadingView的height props |

### Props Config

| Prop | Default | Type | Description |
| :--- | :---: | :---: | :--- |
| fetchStatus | `undefined` | `String` | 详见内部FetchStatus |
| orther props | `...this.props` | `Object` | ... |



