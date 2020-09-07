import React from "react";
import "./input.css";

function Input(props) {
  return (
    <input
      value={props.value}
      onChange={event=>props.setValue(event.target.value)}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
