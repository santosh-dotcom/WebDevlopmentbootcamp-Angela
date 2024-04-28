import React from "react";
import { useState } from "react";

function App() {

  const [HeadingText, setHeadingText] = useState("Hello");
  const [isMouseOver, setMouseOver] = useState(false);

  function handleClick(){
    setHeadingText("Submitted");
  }

  function mouseHandleOver(){
    setMouseOver(true);
  }

  function mouseHandleOut(){
    setMouseOver(false);
  }

  return (
    <div className="container">
      <h1>{HeadingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button style={{ backgroundColor: isMouseOver ? "black" : "white"}} onClick={handleClick}
      onMouseOver={mouseHandleOver}
      onMouseOut={mouseHandleOut}>Submit</button>
    </div>
  );
}

export default App;
