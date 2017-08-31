import React,{ Component,PropTypes } from 'react';
import { View } from "react-web-dom";

export class LoadingView extends Component{
    static propTypes = {
        height : PropTypes.number,
        autoLayout : PropTypes.bool,
    };
    static defaultProps = {
        height : window.innerWidth*0.4,
        autoLayout : false,
    };
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <div>请求中</div>
            </View>
        )
    }
}

export default LoadingView
