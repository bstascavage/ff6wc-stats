import React from "react";
import cover from "../assets/submit-cover.jpg";
import Page from "./Page";

function Submit() {
  return (
    <React.Fragment>
      <Page
        cover={cover}
        bannerTitle="Submit a Run"
        bannerSubtitle="Fill out the results of your latest run"
        higherCrop={true}
      >
        <p>TODO: Submit data</p>
      </Page>
    </React.Fragment>
  );
}

export default Submit;
