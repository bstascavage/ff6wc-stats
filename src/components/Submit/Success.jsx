import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "../Page";
import sucessIcon from "../../assets/submit-success.png";
import "./scss/main.scss";

function Success(props) {
  const navigate = useNavigate();

  function handleClick(event, redirect) {
    event.preventDefault();
    redirect === "/submit" ? navigate(0) : navigate(redirect);
  }

  return (
    <React.Fragment>
      <Page>
        <div className="submit-success-container">
          <img className="submit-success-icon" src={sucessIcon} alt="Logo" />
        </div>
        <div className="submit-success-container">
          Run submitted. GGs on your amazing run!
        </div>
        <div className="section">
          <div className="container">
            <div className="submit-container" id="submit-container">
              <button onClick={(event) => handleClick(event, "/stats")}>
                See Your Stats
              </button>
              <button onClick={(event) => handleClick(event, "/submit")}>
                Submit Another Run
              </button>
            </div>
          </div>
        </div>
      </Page>
    </React.Fragment>
  );
}

export default Success;
