import React from "react";

function TextInput(props) {
  return (
    <fieldset>
      <input
        className="input"
        name={props.id}
        type="text"
        placeholder={props.placeholder}
      />
    </fieldset>
  );
}

export default TextInput;
