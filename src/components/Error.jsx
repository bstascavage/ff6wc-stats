import React from "react";
import cover from "../assets/covers/home-cover.webp";
import Page from "./Page";

function Error() {
  return (
    <React.Fragment>
      <Page cover={cover}>
        <p>
          Error authenticating with Discord. Please refresh the page and login
          again.
        </p>
      </Page>
    </React.Fragment>
  );
}

export default Error;
