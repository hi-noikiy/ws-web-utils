import React, { Component } from "react";
import PropTypes from "prop-types";
import FetchStatus from '../fetch-status';
import {
    LoadingView,
    FailureView,
    ErrorView,
} from './fetchView';
import {
    Toast,
} from "antd-mobile";



const stateHOC = (initHocParams = {})=>{
    const hocParams = Object.assign({}, {
        LoadingView,
        FailureView,
        ErrorView,
    }, initHocParams)
    return (WrappedComponent)=>{
        return class StateContainer extends WrappedComponent {
            static navigationOptions = WrappedComponent.navigationOptions;
            static propTypes = {
                // LoadingView : PropTypes.func,
                // FailureView : PropTypes.func,
                // ErrorView : PropTypes.func,
            };
            static defaultProps = {
                // LoadingView,
                // FailureView,
                // ErrorView,
            };
            componentDidMount(){
                super.hocComponentDidMount && super.hocComponentDidMount()
            }
            render() {

                const {
                    fetchStatus,
                } = this.props

                const {
                    detail,
                    keyFunc,
                } = hocParams

                if(detail){

                    const key = super.hocDetailKey&&super.hocDetailKey()

                    if(!key){
                        Toast.fail('装饰器参数传递错误')
                        return null
                    }

                    return this.showView(fetchStatus[key])

                }else {
                    return this.showView(fetchStatus)
                }
            }
            showView(fetchStatus){

                const {
                    height,
                    LoadingView,
                    FailureView,
                    ErrorView,
                } = hocParams

                const LoadingViewStyle = Object.assign({},{
                    autoLayout : height==undefined?true:false,
                    height,
                })

                switch (fetchStatus) {
                    case FetchStatus.l:
                        return  (
                            <LoadingView
                                {...LoadingViewStyle}
                            />
                        )
                    case FetchStatus.s:
                        return <WrappedComponent {...this.props}/>
                    case FetchStatus.f:
                        return  <FailureView autoLayout/>
                    case FetchStatus.e:
                        return  <ErrorView autoLayout/>
                    default :
                        return null
                }
            }
        }
    }
}

export default stateHOC
