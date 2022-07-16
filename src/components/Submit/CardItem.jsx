import React from "react";
import "./scss/main.scss";

function CardItem(props) {
  let helpTextClass = props.helpText ? "" : "is-hidden";
  let subtitleTextClass = props.subtitleText ? "" : "is-hidden";

  return (
    <React.Fragment>
      <div className="field is-horizontal">
        <div
          className="field-label is-normal"
          style={{ flexGrow: "2", textAlign: "left" }}
        >
          <ConditionalWrapper
            condition={props.required}
            wrapper={(children) => <div className="required">{children}</div>}
          >
            <label htmlFor="xpm">{props.title}</label>
          </ConditionalWrapper>
          <p
            id={`${props.id}-subtitle`}
            className={`has-text-grey help ${subtitleTextClass}`}
          >
            {props.subtitleText}
          </p>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded">{props.children}</div>
            <p
              id={`${props.id}-card-help`}
              className={`has-text-grey help ${helpTextClass}`}
            >
              {props.helpText}
            </p>
            {renderErrorMessage(props.validationResults, props.id)}
          </div>
        </div>
      </div>
    </React.Fragment>
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

export default CardItem;
