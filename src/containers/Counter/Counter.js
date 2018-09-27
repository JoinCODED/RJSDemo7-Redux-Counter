import React, {Component} from 'react';


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

export default Counter;