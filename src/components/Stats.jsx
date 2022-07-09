import React from "react";
import Page from "./Page";
import cover from "../assets/stats-cover.jpg";

function Stats() {
  return (
    // </React.Fragment >
    <React.Fragment>
      <Page
        cover={cover}
        banner_title="Run Stats"
        banner_subtitle="Stats pertaining to run times"
      >
        <p>Placeholder for ststs</p>
      </Page>
    </React.Fragment>
  );
}

export default Stats;
