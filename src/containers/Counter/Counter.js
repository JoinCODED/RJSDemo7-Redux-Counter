import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../store/actions';


class Counter extends Component {
    constructor(props){
        super(props)
        this.state = {
            counter: 0,
        }
        this.incrementHandler = this.incrementHandler.bind(this);
        this.decrementHandler = this.decrementHandler.bind(this);

    }
    
    incrementHandler(){
        this.setState({counter: this.state.counter + 1});
    }

    decrementHandler(){
        this.setState({counter: this.state.counter -1});  
    }
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