import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "../Page";
import sucessIcon from "../../assets/submit-success.png";
import "./scss/main.scss";

function Success(props) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/stats");
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
              <button onClick={handleClick}>See Your Stats</button>
            </div>
          </div>
        </div>
      </Page>
    </React.Fragment>
  );
}

export default Success;
