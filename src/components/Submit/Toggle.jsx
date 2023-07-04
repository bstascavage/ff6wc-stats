import React from "react";
import "./scss/main.scss";

function Toggle(props) {
  const handleChange = (value) => {
    props.value.toggle[props.id] = value.target.checked;
    props.valueSetter({ ...props.value });
  };

  return (
    <div className="field">
      <ConditionalWrapper
        condition={props.required}
        wrapper={(children) => (
          <div className="required-toggle">{children}</div>
        )}
      >
        <input
          className="switch is-thin is-link"
          id={props.id}
          name={props.id}
          type="checkbox"
          onChange={handleChange}
          value={props.value}
          checked={props.value.toggle[props.id]}
        />
        <label htmlFor={props.id}>{props.title}</label>
      </ConditionalWrapper>

      <p id={`${props.id}-help`} className="has-text-grey help is-marginless">
        {props.help}
      </p>
      {renderErrorMessage(props.validationResults, props.id)}
    </div>
  );
}

function renderErrorMessage(validationResults, id) {
  if (Object.keys(validationResults).length !== 0) {
    if (!validationResults.validationDetails[`validate_${id}`].result) {
      return (
        <div>
          <p id={`${id}Error`} className="validation-error">
            {validationResults.validationDetails[`validate_${id}`].reason}
          </p>
        </div>
      );
    }
  }
}

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default Toggle;
