import React from "react";

function FilterWrapper(props) {
  return (
    <React.Fragment>
      <div className="filter is-desktop">{props.children}</div>
    </React.Fragment>
  );
}

export default FilterWrapper;
