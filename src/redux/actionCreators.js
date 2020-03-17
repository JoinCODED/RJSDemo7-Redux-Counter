export const increment = step => {
  return {
    type: "INCREMENT",
    payload: step
  };
};

export const fetchPosts = () => {
  return {
    type: "SET_POSTS",
    payload: [
      { title: "one thing" },
      { title: "another thing" },
      { title: "one more thing" }
    ]
  };
};
