import React,{ Component } from 'react';
import PropTypes from 'prop-types';

export default class NullDataView extends Component{
    static propTypes = {
        height : PropTypes.number,
        autoLayout : PropTypes.bool,
    };
    static defaultProps = {
        height : window.innerWidth*0.4,
        autoLayout : false,
    };
    render() {
        const {autoLayout} = this.props
        return (
            <div>没有数据哦</div>
        )
    }
}
