import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Page from "../Page";
import sucessIcon from "../../assets/submit-success.png";
import "./scss/main.scss";

function Success(props) {
  const navigate = useNavigate();

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
              <Button color="primary" onClick={(event) => navigate("/stats")}>
                See Your Stats
              </Button>
              <Button color="primary" onClick={(event) => navigate(0)}>
                Submit Another Run
              </Button>
            </div>
          </div>
        </div>
      </Page>
    </React.Fragment>
  );
}

export default Success;
