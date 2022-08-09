import React from "react";
import cover from "../assets/covers/home-cover.webp";
import Page from "./Page";

function Error() {
  return (
    <React.Fragment>
      <Page
        cover={cover}
        bannerTitle="Error"
        bannerSubtitle="There was an issue.  If you think you are seeing this page in error, please contact an administrator."
      >
        <p>Error authenticating with Discord. Please log out and try again.</p>
      </Page>
    </React.Fragment>
  );
}

export default Error;
