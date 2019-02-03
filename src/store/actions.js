const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const LOG = "LOG";

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};

export const log = () => {
  return {
    type: LOG
  };
};
