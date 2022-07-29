import React from "react";
import cover from "../assets/home-cover.webp";
import Page from "./Page";

function Home() {
  return (
    <React.Fragment>
      <Page cover={cover} logo={true}>
        <p>
          Welcome to Seto Kiaba’s Final Fantasy VI: Worlds Collide statistical
          dashboard. Click the things at the top to do the things.
        </p>
      </Page>
    </React.Fragment>
  );
}

export default Home;
