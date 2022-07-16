import React from "react";
import "./scss/main.scss";

function Slider(props) {
  const handleChange = (event) => {
    let value = event.target.value;
    let regEx = /^\+?(0|[1-9]\d*)$/;
    if (regEx.test(value)) {
      value = parseInt(value) > parseInt(props.max) ? props.max : value;

      props.value.slider[props.id] = value;
      props.valueSetter({ ...props.value });
    }
  };

  const handleFocus = (event) => event.target.select();

  return (
    <React.Fragment>
      <input
        className="slider has-output is-fullwidth is-link is-marginless"
        id={`${props.id}-slider`}
        max={props.max}
        min={props.min}
        name={`${props.id}-slider`}
        step={props.step}
        type="range"
        value={props.value.slider[props.id]}
        onChange={handleChange}
      />
      <input
        className="input slider-text"
        id={props.id}
        name={props.id}
        step={props.step}
        type="text"
        value={props.value.slider[props.id]}
        onFocus={handleFocus}
        onChange={handleChange}
      />
    </React.Fragment>
  );
}

export default Slider;
