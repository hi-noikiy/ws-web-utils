import React,{ Component } from 'react';
import PropTypes from 'prop-types';

export class FailureView extends Component{
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
            <div>失败了呢</div>
        )
    }
}

export default FailureView
