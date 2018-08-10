import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NullData extends Component {
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
            <div>暂无数据</div>
        )
    }
}
