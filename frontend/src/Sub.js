import React from "react";

const Sub = ({ fn, buttonTxt }) => {
  return (
    <div className="Sub">
      <input type="text"></input>
      <button onClick={fn}>{buttonTxt}</button>
    </div>
  );
};

export default Sub;
