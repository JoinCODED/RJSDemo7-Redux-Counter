import { INCREMENT } from "./actionTypes";

export const increment = step => {
  return {
    type: INCREMENT,
    payload: step
  };
};
