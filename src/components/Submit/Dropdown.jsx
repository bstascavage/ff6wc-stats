import React from "react";
import "./scss/main.scss";

function Dropdown(props) {
  const handleChange = (value) => {
    for (let i = 0; i < props.value.enum[props.id].length; i++) {
      props.value.enum[props.id][i].name === value.target.value
        ? (props.value.enum[props.id][i].checked = true)
        : (props.value.enum[props.id][i].checked = false);
    }

    props.valueSetter({ ...props.value });
  };

  let dropdown = [];
  const elems = props.value.enum[props.id];
  let defaultValue = "";

  for (let i = 0; i < elems.length; i++) {
    if (elems[i].checked === true) {
      defaultValue = elems[i].name;
    }
    dropdown.push(
      <option value={elems[i].name} key={elems[i].name}>
        {elems[i].display_name}
      </option>,
    );
  }
  return (
    <React.Fragment>
      <select
        className="input"
        id={props.id}
        name={props.name}
        onChange={handleChange}
        value={defaultValue}
      >
        {dropdown}
      </select>
    </React.Fragment>
  );
}

export default Dropdown;
