import React,{ Component,PropTypes } from 'react';

export default class ErrorView extends Component{
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
            <div>异常了呢</div>
        )
    }
}
