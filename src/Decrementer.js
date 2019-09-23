import React, { Component } from "react";

class Decrementer extends Component {
  state = {
    counter: 0
  };

  decrementCounter = () => {
    let newNumber = this.state.counter - 1;
    this.setState({ counter: newNumber });
  };

  render() {
    return (
      <div className="col-lg-6">
        <div className="component">
          <p>DECREMENTER</p>
          <p>{this.state.counter}</p>
          <button
            className="btn btn-lg btn-outline-dark"
            onClick={this.decrementCounter}
          >
            Decrement
          </button>
        </div>
      </div>
    );
  }
}

export default Decrementer;
