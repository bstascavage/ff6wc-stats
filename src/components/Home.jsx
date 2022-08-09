import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Page from "./Page";
import cover from "../assets/home-cover.webp";

function Home(props) {
  let homeConfig = props.config.home;

  function getColumnsFromConfig(config) {
    let renderList = [];
    for (let i = 0; i < config.columns.length; i++) {
      const column = (
        <React.Fragment key={`home-column-${i}`}>
          {homeColumn(
            config.columns[i].title,
            config.columns[i].content,
            config.columns[i].linkPath,
            config.columns[i].icon
          )}
        </React.Fragment>
      );
      renderList.push(column);
    }

    return renderList;
  }

  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }

  function homeColumn(title, content, linkPath, icon) {
    // Set button based on whether the user is logged in and whether the path exists
    const link =
      Object.keys(props.discordUserdata.userdata).length === 0 ? "/" : linkPath;

    // Router Link does not work with external urls, so if user id isn't set, we need to wrap the button with <a href>
    const colButton = linkPath ? (
      <ConditionalWrapper
        condition={Object.keys(props.discordUserdata.userdata).length === 0}
        wrapper={(children) => (
          <a
            className="col-button"
            href={process.env.REACT_APP_DISCORD_OAUTH_LINK}
          >
            {children}
          </a>
        )}
      >
        <Button
          color="primary"
          className={
            Object.keys(props.discordUserdata.userdata).length !== 0
              ? "col-button"
              : ""
          }
          onClick={() => handleClick(link)}
        >
          {title}
        </Button>
      </ConditionalWrapper>
    ) : (
      <Button color="secondary" className="col-button">
        Coming Soon
      </Button>
    );

    const col = (
      <Col className="mb-5 mb-xl-0 col-align-center col-height" lg="4" xl="4">
        <Card
          style={{
            width: "25rem",
            height: "330px",
          }}
        >
          <div className="block-image" style={{ marginTop: "20px" }}>
            <figure className="aligncenter size-full">
              <img src={icon} alt="" className="wp-image-77 sprite" />
            </figure>
          </div>
          <CardTitle
            tag="h5"
            className="has-text-align-center has-text-color"
            style={{ color: "#3c4858", fontSize: "18px" }}
          >
            {title}
          </CardTitle>
          <CardBody
            className="has-text-align-center has-text-color"
            style={{ color: "#999999", fontSize: "14px" }}
          >
            {content}
          </CardBody>
          <CardBody style={{ marginBottom: "20px" }}>{colButton}</CardBody>
        </Card>
      </Col>
    );
    return col;
  }

  let body = (
    <React.Fragment>
      <Container fluid className="pt-4 pb-5" style={{ width: "60em" }}>
        <center className="home-summary pb-5">{homeConfig.intro}</center>
        <center className="home-summary">{homeConfig.faq}</center>
      </Container>
      <Container fluid className="pt-4" style={{ width: "50em" }}>
        <center>
          <h2>How To Use Stats Collide</h2>
        </center>
        <div style={{ height: "10px" }} />
      </Container>
      <Container fluid className="pt-4 pb-5" style={{ maxWidth: "80em" }}>
        <Row>{getColumnsFromConfig(homeConfig)}</Row>
      </Container>
    </React.Fragment>
  );

  let page = (
    <Page cover={cover} logo={true}>
      {body}
    </Page>
  );
  return <React.Fragment>{page}</React.Fragment>;
}

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default Home;
