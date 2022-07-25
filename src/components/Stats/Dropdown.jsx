import React from "react";
import "../Submit/scss/main.scss";

function Dropdown(props) {
  const handleChange = (event) => {
    props.setRunDataState({
      type: "set_filter",
      filter: {
        type: props.id,
        value: event.target.value,
      },
    });
  };
  let dropdown = [
    <option value={props.id} key={`${props.id}-default-disabled`} disabled>
      {props.title}
    </option>,
  ];
  for (let i = 0; i < props.choices.length; i++) {
    dropdown.push(
      <option value={props.choices[i].name} key={props.choices[i].name}>
        {props.choices[i].display_name}
      </option>
    );
  }
  return (
    <React.Fragment>
      <div className="dropdown-container">
        <select
          className="input"
          onChange={handleChange}
          id={props.id}
          name={props.name}
          defaultValue={props.id}
        >
          {dropdown}
        </select>
      </div>
    </React.Fragment>
  );
}

export default Dropdown;
