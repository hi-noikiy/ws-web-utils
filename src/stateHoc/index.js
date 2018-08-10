import React, { Component } from "react";
import FetchStatus from '../fetchStatus';
import {
    Loading,
    Failure,
    Error,
    NullData,
} from './fetchView';
import { config } from "../config";
const stateHOC = (initHocParams = {}) => {
    const hocParams = Object.assign({}, {
        LoadingView: Loading,
        FailureView: Failure,
        ErrorView: Error,
        NullDataView: NullData,
    }, initHocParams)
    return (WrappedComponent) => {
        return class StateContainer extends WrappedComponent {
            static navigationOptions = WrappedComponent.navigationOptions;
            static propTypes = {};
            static defaultProps = {};

            componentDidMount() {
                super.hocComponentDidMount && super.hocComponentDidMount()
            }

            render() {

                const {
                    fetchStatus,
                } = this.props

                const {
                    detail,
                } = hocParams

                if (detail) {

                    const key = super.hocDetailKey && super.hocDetailKey()

                    if (!key) {
                        config.ToastError('装饰器参数传递错误')
                        return null
                    }

                    return this.showView(fetchStatus[key])

                } else {
                    return this.showView(fetchStatus)
                }
            }

            showView(fetchStatus) {
                const {
                    height,
                    LoadingView,
                    FailureView,
                    ErrorView,
                    NullDataView,
                } = hocParams

                const LoadingViewStyle = Object.assign({}, {
                    autoLayout: height === undefined,
                    height,
                })

                switch (fetchStatus) {
                    case FetchStatus.l:
                        return (
                            <LoadingView
                                {...LoadingViewStyle}
                            />
                        )
                    case FetchStatus.s:

                        if (super.hocNullDataFunc && super.hocNullDataFunc()) {
                            return <NullDataView {...LoadingViewStyle} />
                        } else {
                            return <WrappedComponent {...this.props} stateHOCState={this.state} />
                        }

                    case FetchStatus.f:
                        return <FailureView {...LoadingViewStyle} />
                    case FetchStatus.e:
                        return <ErrorView {...LoadingViewStyle} />
                    default :
                        return null
                }
            }
        }
    }
}

export default stateHOC
