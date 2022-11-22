import React from "react";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

function FilterDropdown(props) {
  const changeValue = (event) => {
    if (props.resetOthers) {
      // If dropdown resets all filter dropdowns
      props.setStatsState({
        type: "reset_filters",
      });
    }

    props.setStatsState({
      type: "set_filter",
      filter: {
        type: props.id,
        name: event.currentTarget.textContent,
        value: event.target.value,
      },
    });
  };

  let dropdown = [];
  for (let i = 0; i < props.choices.length; i++) {
    dropdown.push(
      <DropdownItem
        key={props.choices[i].name}
        value={props.choices[i].name}
        onClick={changeValue}
      >
        {props.choices[i].displayName}
      </DropdownItem>,
    );
  }

  return (
    <React.Fragment>
      <UncontrolledDropdown className="dropdown-filter">
        <DropdownToggle className="dropdown-filter-menu" caret>
          {props.statsState.filters[props.id].name}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{props.title}</DropdownItem>
          {dropdown}
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );
}

export default FilterDropdown;
