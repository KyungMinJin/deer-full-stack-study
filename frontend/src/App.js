import React, { useState, useEffect } from "react";
import Sub from "./Sub";

function App() {
  const [c, setC] = useState(3);

  const addOne = () => {
    setC(c + 1);
  };

  useEffect(() => {
    console.log(c);
  });
  return (
    <div className="App">
      <p>{c}</p>
      <button onClick={addOne}>click me!</button>
      <Sub buttonTxt="hello click" fn={addOne} />
      <Sub buttonTxt="myno click" fn={() => setC(c - 1)} />
    </div>
  );
}

export default App;
