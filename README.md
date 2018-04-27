# ws-web-utils

Can only be used internally for the project

## Installation

```bash
$ npm install --save ws-web-utils
```

## **API**

# `stateHoc([options])`

#### stateHoc是一个高阶组件，用于处理业务组件的等待、请求、异常处理显示等...

#### `[options] (Object)`

* ##### `LoadingView`
* ##### `FailureView`
* ##### `ErrorView`
* ##### `NullDataView`
* ##### `detail`  \(_Boolean_\): 如果 true ，则会通过 `hocDetailKey` 来获得`key`值用来处理渲染判断
* ##### `hocDetailKey`

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



