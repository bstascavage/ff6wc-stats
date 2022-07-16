import React from "react";
import Page from "../Page";
import sucessIcon from "../../assets/submit-success.png";
import "./scss/main.scss";

function Success(props) {
  return (
    <React.Fragment>
      <Page>
        <div className="submit-success-container">
          <img className="submit-success-icon" src={sucessIcon} alt="Logo" />
        </div>
        <div className="submit-success-container">
          Submitted. Please manually refresh the page, as I still need to work
          out the kinks with submission acceptance.
        </div>
      </Page>
    </React.Fragment>
  );
}

export default Success;
