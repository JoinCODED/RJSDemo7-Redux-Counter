import React, { Component } from "react";

class Incrementer extends Component {
  state = {
    counter: 0
  };

  incrementCounter = () => {
    let newNumber = this.state.counter + 1;
    this.setState({ counter: newNumber });
  };

  render() {
    return (
      <div className="col-lg-6">
        <div className="component">
          <p>INCREMENTER</p>
          <p>{this.state.counter}</p>
          <button
            className="btn btn-lg btn-outline-dark"
            onClick={this.incrementCounter}
          >
            Increment
          </button>
        </div>
      </div>
    );
  }
}

export default Incrementer;
