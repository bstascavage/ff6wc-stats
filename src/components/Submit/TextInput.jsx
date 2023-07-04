import React from "react";

function TextInput(props) {
  const handleChange = (value) => {
    props.value.textInput[props.id] = value.target.value;
    props.valueSetter({ ...props.value });
  };

  return (
    <fieldset>
      <input
        className="input"
        onChange={handleChange}
        value={props.value.textInput[props.id]}
        name={props.id}
        type="text"
        placeholder={props.placeholder}
      />
    </fieldset>
  );
}

export default TextInput;
