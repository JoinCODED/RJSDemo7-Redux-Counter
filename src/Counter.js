import React, { Component } from "react";

class Counter extends Component {
  state = {
    counter: 0
  };

  incrementHandler = () => this.setState({ counter: this.state.counter + 1 });

  decrementHandler = () => this.setState({ counter: this.state.counter - 1 });

  render() {
    return (
      <div>
        <span className="counter">{this.state.counter}</span>
        <button className="increment" onClick={this.incrementHandler}>
          Increment
        </button>
        <button className="decrement" onClick={this.decrementHandler}>
          Decrement
        </button>
      </div>
    );
  }
}

export default Counter;
