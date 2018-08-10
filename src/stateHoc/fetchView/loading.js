import React, { Component } from 'react';
import { View } from "react-web-dom";
import PropTypes from 'prop-types';

export class Loading extends Component {
    static propTypes = {
        height: PropTypes.number,
        autoLayout: PropTypes.bool,
    };
    static defaultProps = {
        height: window.innerWidth * 0.4,
        autoLayout: false,
    };

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <View>请求中</View>
            </View>
        )
    }
}

export default Loading
