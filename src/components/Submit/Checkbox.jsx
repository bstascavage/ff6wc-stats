import React from "react";
import "./scss/main.scss";

function CheckBox(props) {
  return (
    <fieldset>
      <div className="submission-checkbox">
        {renderCheckbox(props.renderList)}
      </div>
    </fieldset>
  );
}

function renderCheckbox(elems) {
  // Populate checkbox selection
  let renderList = [];
  for (let i = 0; i < elems.length; i++) {
    renderList.push(
      <div className="submission-checkbox-elem" key={elems[i].name}>
        <input type="checkbox" id={elems[i].name} name={elems[i].name}></input>
        <label htmlFor={elems[i].name}>{elems[i].display_name}</label>
      </div>
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
