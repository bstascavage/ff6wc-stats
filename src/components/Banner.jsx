import React from "react";
import "./scss/main.scss";

function Banner(props) {
  return (
    <div
      className="post-header-container has-cover"
      style={{ backgroundImage: `url(${props.cover})` }}
    >
      <div className="scrim has-cover">
        <header className="post-header">
          <h1 className="title">{props.title}</h1>
          <p className="info">
            <strong>{props.subtitle}</strong>
          </p>
        </header>
      </div>
    </div>
  );
}

export default Banner;
