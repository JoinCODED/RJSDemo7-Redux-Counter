import React from "react";

import Incrementer from "./Incrementer";
import Decrementer from "./Decrementer";

function App() {
  return (
    <div className="App">
      <div className="row">
        <Incrementer />
        <Decrementer />
      </div>
    </div>
  );
}

export default App;
