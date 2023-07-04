import React from "react";
import "./scss/main.scss";

function CheckBox(props) {
  return (
    <fieldset>
      <div className="submission-checkbox">{renderCheckbox(props)}</div>
    </fieldset>
  );
}

function renderCheckbox(props) {
  const handleChange = (value) => {
    let selectionList = props.value.enum[props.id];

    for (let i = 0; i < selectionList.length; i++) {
      if (selectionList[i].name === value.target.name) {
        selectionList[i].checked = value.target.checked;
      }
    }
    props.value.enum[props.id] = selectionList;
    props.valueSetter({ ...props.value });
  };

  // Populate checkbox selection
  let renderList = [];
  const elems = props.value.enum[props.id];

  for (let i = 0; i < elems.length; i++) {
    renderList.push(
      <div className="submission-checkbox-elem" key={elems[i].name}>
        <input
          type="checkbox"
          onChange={handleChange}
          id={elems[i].name}
          name={elems[i].name}
          checked={elems[i].checked}
        ></input>
        <label htmlFor={elems[i].name}>{elems[i].display_name}</label>
      </div>,
    );
  }
  return renderList;
}

export function parseCheckboxSelected(selection, response) {
  // Converts user submitted characters to a simple list of strings
  let parsedSelection = [];
  for (let i = 0; i < selection.length; i++) {
    if (response.target[selection[i].name].checked) {
      parsedSelection.push(response.target[selection[i].name].id);
    }
  }

  return parsedSelection;
}

export default CheckBox;
