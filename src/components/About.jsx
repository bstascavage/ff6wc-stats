import React from "react";
import { Container } from "reactstrap";
import Page from "./Page";
import cover from "../assets/covers/about-cover.jpg";

function About(props) {
  let aboutConfig = props.config.about;

  let body = (
    <React.Fragment>
      <Container fluid className="pt-4 pb-5" style={{ width: "50em" }}>
        <center>
          <h2>Frequently Asked Questions</h2>
        </center>
        {getFaqFromConfig(aboutConfig)}
      </Container>
    </React.Fragment>
  );

  let page = (
    <Page
      cover={cover}
      bannerTitle="About"
      bannerSubtitle="An overview of this amazing tool"
      backgroundPositionX="0%"
      backgroundPositionY="70%"
    >
      {body}
    </Page>
  );
  return <React.Fragment>{page}</React.Fragment>;
}

function getFaqFromConfig(config) {
  let renderList = [];
  for (let i = 0; i < config.questions.length; i++) {
    const question = (
      <React.Fragment key={`question-${i}`}>
        <strong style={{ whiteSpace: "pre-line", fontSize: "18px" }}>
          {"\n"}
          {"\n"}
          {config.questions[i].question}
          {"\n"}
          {"\n"}
        </strong>
        <div
          style={{ whiteSpace: "pre-line" }}
          className="about-answer"
          dangerouslySetInnerHTML={{ __html: config.questions[i].answer }}
        />
      </React.Fragment>
    );
    renderList.push(question);
  }

  return renderList;
}

export default About;
