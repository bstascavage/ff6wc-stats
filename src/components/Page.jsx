import React from "react";
import Banner from "./Banner";
import "./scss/main.scss";

function Page({ cover, banner_title, banner_subtitle, children }) {
  return (
    <React.Fragment>
      <Banner cover={cover} title={banner_title} subtitle={banner_subtitle} />

      <div className="page-content" style={{ display: "inline" }}>
        <div className="post">
          <div className="wrapper">
            <article className="post-content">{children}</article>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Page;
