import React from "react";
import Banner from "./Banner";
import "./scss/main.scss";

function Page(props) {
  let banner;
  if (props.bannerTitle) {
    banner = (
      <Banner
        cover={props.cover}
        title={props.bannerTitle}
        subtitle={props.bannerSubtitle}
        higherCrop={props.higherCrop}
      />
    );
  }
  return (
    <React.Fragment>
      {banner}
      <div className="page-content" style={{ display: "inline" }}>
        <div className="post">
          <div className="wrapper">
            <article className="post-content">{props.children}</article>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Page;
