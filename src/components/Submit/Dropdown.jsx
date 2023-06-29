import React from "react";
import "./scss/main.scss";

function Dropdown(props) {
  let dropdown = [];
  for (let i = 0; i < props.choices.length; i++) {
    dropdown.push(
      <option value={props.choices[i].name} key={props.choices[i].name}>
        {props.choices[i].display_name}
      </option>,
    );
  }
  return (
    <React.Fragment>
      <select className="input" id={props.id} name={props.name}>
        {dropdown}
      </select>
    </React.Fragment>
  );
}

export default Dropdown;
