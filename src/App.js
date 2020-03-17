import React from "react";

import Incrementer from "./Incrementer";
import Decrementer from "./Decrementer";
import Posts from "./Posts";

function App() {
  return (
    <div className="App">
      <div className="row">
        <Incrementer />
        <Decrementer />
        <Posts />
      </div>
    </div>
  );
}

export default App;
