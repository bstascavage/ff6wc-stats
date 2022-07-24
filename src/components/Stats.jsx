import React from "react";
import Page from "./Page";
import cover from "../assets/stats-cover.jpg";

function Stats() {
  return (
    <React.Fragment>
      <Page
        cover={cover}
        bannerTitle="Run Stats"
        bannerSubtitle="Stats pertaining to run times"
      >
        <p>Placeholder for ststs</p>
      </Page>
    </React.Fragment>
  );
}

export default Stats;
