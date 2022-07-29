import React from "react";
import { Container } from "reactstrap";
import logo from "../assets/statscollideblack.png";
import "./scss/main.scss";

function Page(props) {
  let bannerTitle = props.logo ? (
    <img className="overlay-image" src={logo} alt="FF6WCStats logo" />
  ) : (
    <div className="scrim has-cover">
      <header className="post-header">
        <h1 className="title">{props.bannerTitle}</h1>
        <p className="info">
          <strong>{props.bannerSubtitle}</strong>
        </p>
      </header>
    </div>
  );
  return (
    <React.Fragment>
      <div
        className={
          "post-header-container has-cover" +
          (props.higherCrop ? " higher-crop" : "")
        }
        style={{ backgroundImage: `url(${props.cover})` }}
      >
        {bannerTitle}
      </div>
      <Container fluid className="pt-4 pb-5">
        {props.children}
      </Container>
    </React.Fragment>
  );
}

export default Page;
