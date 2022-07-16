import React from "react";
import cover from "../assets/home-cover.webp";
import Page from "./Page";

function Error() {
  return (
    <React.Fragment>
      <Page
        cover={cover}
        bannerTitle="Seto Stats"
        bannerSubtitle="A statistical journey through Worlds Collide: The Final Fantasy VI Randomizer"
      >
        <p>Error authenticating with Discord. Please log out and try again.</p>
      </Page>
    </React.Fragment>
  );
}

export default Error;
