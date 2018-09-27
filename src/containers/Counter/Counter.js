import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../store/actions';


class Counter extends Component {
    render() {
        return (
            <div>
            {this.props.ctr}
            <button onClick={this.props.onIncrementCounter}>Increment</button>
            <button onClick={this.props.onDecrementCounter}>Decrement</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter, 
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);