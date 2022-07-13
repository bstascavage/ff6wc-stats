import React from "react";
import Banner from "./Banner";
import "./scss/main.scss";

function Page({ cover, bannerTitle, bannerSubtitle, higherCrop, children }) {
  return (
    <React.Fragment>
      <Banner
        cover={cover}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        higherCrop={higherCrop}
      />

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
