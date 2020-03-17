import React from "react";
import { connect } from "react-redux";

// Action Creators
import { increment } from "./redux/actionCreators";

const Decrementer = props => {
  return (
    <div className="col-lg-6">
      <div className="component">
        <p>DECREMENTER</p>
        <p>{props.counter}</p>
        <button
          className="btn btn-lg btn-outline-dark"
          onClick={props.decrementCounter}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    decrementCounter: () => dispatch(increment(-1))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Decrementer);
