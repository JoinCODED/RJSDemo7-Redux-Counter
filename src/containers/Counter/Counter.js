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
            <span style={{border: '3px solid black', borderRadius: '8px', color: 'black', display: 'block', margin:'auto',marginBottom: '200px', width:'50%', padding:'10px'}}>{this.state.counter}</span>
            <button 
            style={{background:'green', borderRadius: '8px', color: 'white', display: 'block', margin:'auto', width:'50%', padding:'10px'}}
            onClick={this.incrementHandler}>Increment</button>
            <button 
            style={{background:'orange', borderRadius: '8px', color: 'white', display: 'block', margin:'auto', width:'50%', padding:'10px'}}
            onClick={this.decrementHandler}>Decrement</button>
            </div>
        );
    }
}

export default Counter;
