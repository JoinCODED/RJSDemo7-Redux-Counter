import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../store/actions';


class Counter extends Component {
    render() {
        return (
            <div>
            <span style={{border: '3px solid black', borderRadius: '8px', color: 'black', display: 'block', margin:'auto',marginBottom: '200px', width:'50%', padding:'10px'}}>{this.props.ctr}</span>
            <button onClick={this.props.onIncrementCounter}
            style={{background:'green', borderRadius: '8px', color: 'white', display: 'block', margin:'auto', width:'50%', padding:'10px'}}>Increment</button>
            <button onClick={this.props.onDecrementCounter}
            style={{background:'orange', borderRadius: '8px', color: 'white', display: 'block', margin:'auto', width:'50%', padding:'10px'}}
            >Decrement</button>
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