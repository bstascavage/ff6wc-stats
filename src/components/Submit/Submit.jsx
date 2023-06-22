import React, { useReducer, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { API, graphqlOperation } from "aws-amplify";

import Page from "../Page";
import ColumnWrapper from "./ColumnWrapper";
import Column from "./Column";
import Card from "./Card";
import CardItem from "./CardItem";
import TextInput from "./TextInput";
import Slider from "./Slider";
import Toggle from "./Toggle";
import Dropdown from "./Dropdown";
import Success from "./Success";
import CheckBox, { parseCheckboxSelected } from "./Checkbox";
import RunDatePicker from "./RunDatePicker";
import { submitRun } from "../../graphql/mutations";
import cover from "../../assets/covers/submit-cover.jpg";

function submissionReducer(state, action) {
  switch (action.type) {
    case "data_retrieved": // Graphql queries for enum values has succeeded
      return {
        hide_page: false,
        submit_modal: false,
        file_upload: false,
        file_upload_confirm_modal: false,
        file_upload_error: false,
        submitted: false,
        processed: false,
        verified: false,
        accepted: false,
        dataValidationResults: {},
      };
    case "file_upload": // StatsCompanion file uploaded
      return {
        hide_page: false,
        submit_modal: false,
        file_upload: true,
        file_upload_confirm_modal: true,
        file_upload_error: false,
        submitted: false,
        processed: false,
        verified: false,
        accepted: false,
        dataValidationResults: {},
      };
    case "file_upload_confirm": // StatsCompanion file uploaded confirmed by user
      return {
        hide_page: false,
        submit_modal: false,
        file_upload: true,
        file_upload_confirm_modal: false,
        file_upload_error: false,
        submitted: false,
        processed: false,
        verified: false,
        accepted: false,
        dataValidationResults: {},
      };
    case "file_upload_error": // StatsCompanion file uploaded
      return {
        hide_page: false,
        submit_modal: false,
        file_upload: false,
        file_upload_confirm_modal: false,
        file_upload_error: true,
        submitted: false,
        processed: false,
        verified: false,
        accepted: false,
        dataValidationResults: {},
      };
    case "submission_submitted": // Submission data sent to backend
      return {
        hide_page: false,
        submit_modal: true,
        file_upload: false,
        file_upload_confirm_modal: false,
        file_upload_error: false,
        submitted: true,
        processed: false,
        verified: false,
        accepted: false,
        dataValidationResults: {},
      };
    case "submission_processed": // Submission data processed by backend
      return {
        hide_page: false,
        submit_modal: false,
        file_upload: false,
        file_upload_confirm_modal: false,
        file_upload_error: false,
        submitted: true,
        processed: true,
        verified: action.submissionResults.validation.validationStatus,
        accepted: action.submissionResults.creation.createStatus,
        dataValidationResults: action.submissionResults.validation,
      };
    case "reset":
      return {
        hide_page: true,
        submit_modal: false,
        file_upload: false,
        file_upload_confirm_modal: false,
        file_upload_error: false,
        submitted: false,
        processed: false,
        verified: false,
        accepted: false,
        dataValidationResults: {},
      };
    default:
      return state;
  }
}

function Submit(props) {
  const [submissionState, setSubmissionState] = useReducer(submissionReducer, {
    hide_page: true,
    submit_modal: false,
    submitted: false,
    processed: false,
    verified: false,
    accepted: false,
    dataValidationResults: {},
  });

  // `enum`: List of possible options for enumFields, pulled from GraphQL
  // `slider`: Keeps state of the slider components
  let fieldDataDefault = { enum: {}, slider: {}, textInput: {}, toggle: {} };

  Object.keys(props.config.submit).forEach((key, index) => {
    if (
      props.config.submit[key].type === "checkbox" ||
      props.config.submit[key].type === "dropdown"
    ) {
      fieldDataDefault.enum[key] = "";
    } else if (props.config.submit[key].type === "slider") {
      fieldDataDefault.slider[key] = props.config.submit[key].startingValue;
    } else if (props.config.submit[key].type === "textInput") {
      fieldDataDefault.textInput[key] = "";
    } else if (props.config.submit[key].type === "toggle") {
      fieldDataDefault.toggle[key] = false;
    } else if (props.config.submit[key].type === "datetimepicker") {
      fieldDataDefault.runDate = new Date();
    }
  });
  const [submitFieldData, setSubmitFieldData] = useState(fieldDataDefault);

  useEffect(() => {
    // Retrieve possible character/ability/dragon selections from graphql to set as checkboxes
    getEnumSelection(
      submitFieldData,
      props.config,
      setSubmitFieldData,
      setSubmissionState,
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(props.config.submit);
    // Dynamically create the submission payload based on the config
    let submitPayload = { userId: props.discordUserdata.userdata.id };
    Object.keys(props.config.submit).forEach((key, index) => {
      if (props.config.submit[key].type === "checkbox") {
        submitPayload[key] = parseCheckboxSelected(
          submitFieldData.enum[key],
          event,
        );
      } else if (props.config.submit[key].type === "toggle") {
        submitPayload[key] = event.target[key].checked;
      } else if (props.config.submit[key].type === "datetimepicker") {
        submitPayload[key] = submitFieldData.runDate;
      } else {
        submitPayload[key] = event.target[key].value;
      }
    });

    // Send data to the backend and set the response to `submissionState.dataValidationResults`
    try {
      setSubmissionState({ type: "submission_submitted" });
      API.graphql(graphqlOperation(submitRun, submitPayload))
        .then((responseJson) => {
          setSubmissionState({
            type: "submission_processed",
            submissionResults: JSON.parse(responseJson.data.submitRun),
          });
        })
        .catch(console.error);
    } catch (err) {
      console.log("error submitting to the backend: ", err);
    }
  };

  // Function called when file upload is clicked
  const uploadFile = (event) => {
    event.preventDefault();
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");

    fileReader.onload = (event) => {
      try {
        populateFieldsFromFile(
          event.target.result,
          props.config.submit,
          submitFieldData,
          setSubmissionState,
        );
      } catch (err) {
        console.log("Error uploading StatsCompanion file");
        setSubmissionState({ type: "file_upload_error" });
      }
    };
  };

  // Function called when the 'Confirm' button is clicked after a file upload
  const confirmUpload = (event) => {
    setSubmissionState({ type: "file_upload_confirm" });
  };

  // Function called when the 'Confirm' button is clicked after a file upload error
  const confirmUploadError = (event) => {
    setSubmissionState({ type: "data_retrieved" });
  };

  // Determine page rendering
  let page;

  if (Object.keys(props.discordUserdata.userdata).length === 0) {
    page = <Navigate to="/" replace={true} />; // Redirect if user isn't logged in
  } else if (submissionState.accepted) {
    page = <Success />;
  } else {
    page = (
      <Page
        cover={cover}
        bannerTitle="Submit a Run"
        bannerSubtitle="Fill out the results of your latest run"
        backgroundPositionX="50%"
        backgroundPositionY="30%"
      >
        <Modal isOpen={submissionState.submit_modal}>
          <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
            Submitting Run
          </ModalHeader>
          <ModalBody>Please wait as we verify your data.</ModalBody>
        </Modal>

        <Modal isOpen={submissionState.file_upload_confirm_modal}>
          <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
            StatsCompanion Log Upload Complete
          </ModalHeader>
          <ModalBody>
            Please review your data and make any changes. Once done, hit{" "}
            <b>Submit</b> below.
          </ModalBody>
          <div
            className="submit-container"
            id="submit-container"
            style={{ paddingBottom: "15px" }}
          >
            <Button color="primary" type="submit" onClick={confirmUpload}>
              Continue
            </Button>
          </div>
        </Modal>

        <Modal isOpen={submissionState.file_upload_error}>
          <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
            Error
          </ModalHeader>
          <ModalBody>
            There was an error with uploading your StatsCompanion log file; log
            file is not in the proper JSON format. If you think this was caused
            in error, please reach out to an administrator.
          </ModalBody>
          <div
            className="submit-container"
            id="submit-container"
            style={{ paddingBottom: "15px" }}
          >
            <Button color="primary" type="submit" onClick={confirmUploadError}>
              Continue
            </Button>
          </div>
        </Modal>

        <div className="submit-container" id="submit-container">
          <div>Manually enter your data below</div>
          <div>
            <b>OR</b>
          </div>
          <label
            htmlFor="file-upload"
            className="btn btn-primary label-no-bottom-margin"
          >
            <input id="file-upload" type="file" onChange={uploadFile} />
            Upload StatsCompanion Log
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <ColumnWrapper>
            {getColumn(
              "columnLeft",
              props.config,
              submissionState.dataValidationResults,
              submitFieldData,
              setSubmitFieldData,
            )}
            {getColumn(
              "columnRight",
              props.config,
              submissionState.dataValidationResults,
              submitFieldData,
              setSubmitFieldData,
            )}
          </ColumnWrapper>
          <div className="submit-container" id="submit-container">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Page>
    );
  }

  page = submissionState.hide_page ? <div></div> : page;
  return <React.Fragment>{page}</React.Fragment>;
}

function getEnumSelection(
  selectionState,
  config,
  setFunction,
  setSubmissionState,
) {
  // Retrieve list of enum values from database based on query
  Object.keys(selectionState.enum).forEach((key, index) => {
    let query = `query {
      __type(name: "${config.submit[key].enumName}") {
        name
        enumValues {
          name
          description
        }
      }
    }
    `;

    try {
      API.graphql(graphqlOperation(query))
        .then((responseJson) => {
          let elems = [];
          for (let i = 0; i < responseJson.data.__type.enumValues.length; i++) {
            // Converting from graphql query output to simple list of elements
            // Graphql doesn't allow special chars in its enum names besides '_'
            // It does allow comments/descriptions but Amplify is dumb and hasn't implemented it (despite it being the standard since fucking 2018)
            // Therefore we need to replace '_' with ' ' for the text actually displayed to the user, and '__' with ' - '
            let elem_display_name = responseJson.data.__type.enumValues[i].name;
            if (responseJson.data.__type.enumValues[i].name.includes("_"))
              elem_display_name = responseJson.data.__type.enumValues[i].name
                .replace(/__/g, " - ")
                .replace(/_/g, " ");

            // Only display flagsets that are marked as "active" ie current TotM.
            if (
              (key === "flagset" &&
                config.submit_misc.active_flagsets.includes(
                  responseJson.data.__type.enumValues[i].name,
                )) ||
              key !== "flagset"
            ) {
              elems.push({
                name: responseJson.data.__type.enumValues[i].name,
                display_name: elem_display_name,
                checked: false,
              });
            }
          }
          selectionState.enum[key] = elems;
          setFunction(selectionState);
        })
        .then((responseJson) => {
          setSubmissionState({
            type: "data_retrieved",
          });
        })
        .catch(console.error);
    } catch (err) {
      console.log("error fetching enum list from backend for query: ", query);
    }
  });
}

function createItem(
  config,
  validationResults,
  submitFieldData,
  setSubmitFieldData,
) {
  // Creates the component based on the config info
  // TODO: Can we refactor the opts here? And datavalidation results?
  let body = "";
  if (config.type === "slider") {
    body = (
      <Slider
        id={config.id}
        min={config.min}
        max={config.max}
        step={config.step}
        value={submitFieldData}
        valueSetter={setSubmitFieldData}
      />
    );
  } else if (config.type === "textInput") {
    body = (
      <TextInput
        id={config.id}
        placeholder={config.placeholder}
        value={submitFieldData}
        valueSetter={setSubmitFieldData}
      />
    );
  } else if (config.type === "checkbox") {
    body = (
      <CheckBox
        id={config.id}
        value={submitFieldData}
        valueSetter={setSubmitFieldData}
      />
    );
  } else if (config.type === "dropdown") {
    body = (
      <Dropdown
        id={config.id}
        value={submitFieldData}
        valueSetter={setSubmitFieldData}
      />
    );
  } else if (config.type === "toggle") {
    return (
      <Toggle
        id={config.id}
        title={config.title}
        required={config.required}
        help={config.help}
        validationResults={validationResults}
        key={`${config.id}-toggle`}
        value={submitFieldData}
        valueSetter={setSubmitFieldData}
      />
    );
  } else if (config.type === "datetimepicker") {
    body = (
      <RunDatePicker
        id={config.id}
        value={submitFieldData}
        valueSetter={setSubmitFieldData}
        key={`${config.id}-datepicker`}
      />
    );
  } else {
    console.error("Incorrect type specified in config: ", config);
  }

  // TODO: Maybe pass the entire config in as a props?
  return (
    <CardItem
      title={config.title}
      helpText={config.help}
      subtitleText={config.subtitleText}
      id={config.id}
      validationResults={validationResults}
      required={config.required}
      key={config.id}
    >
      {body}
    </CardItem>
  );
}

function getColumn(
  columnId,
  config,
  validationResults,
  submitFieldData,
  setSubmitFieldData,
) {
  // Creates a column made up of cards and items in the cards.
  let cardList = [];
  Object.keys(config.submitFormat[columnId]).forEach((cardTitle, index) => {
    let renderList = [];
    for (
      let i = 0;
      i < config.submitFormat[columnId][cardTitle].children.length;
      i++
    ) {
      let id = config.submitFormat[columnId][cardTitle].children[i];

      let item = createItem(
        config.submit[id],
        validationResults,
        submitFieldData,
        setSubmitFieldData,
      );
      renderList.push(item);
    }
    cardList.push(
      <Card
        key={cardTitle}
        title={config.submitFormat[columnId][cardTitle].title}
      >
        {renderList}
      </Card>,
    );
  });
  return <Column>{cardList}</Column>;
}

function populateFieldsFromFile(
  fileContents,
  config,
  submitFieldData,
  setSubmissionState,
) {
  /**
   * Given a JSON file of submission data, re-render the form fields with
   * this new data.  Used for StatsCompanion to parse its output
   * @param {Object} fileContents A JSON containing submission data
   * @param {Object} config The config file for `submit` section of the statscollide config
   * @param {Object} submitFieldData The state for each submission field
   * @param {Function} setSubmissionState The mutator function for the submission page state
   */

  const submissionJSON = JSON.parse(fileContents);

  for (const [key, value] of Object.entries(submissionJSON)) {
    if (key in config) {
      if (config[key].type === "slider") {
        submitFieldData.slider[key] = value;
      } else if (
        config[key].type === "checkbox" ||
        config[key].type === "dropdown"
      ) {
        for (let i = 0; i < submitFieldData.enum[key].length; i++) {
          value.includes(submitFieldData.enum[key][i].name)
            ? (submitFieldData.enum[key][i]["checked"] = true)
            : (submitFieldData.enum[key][i]["checked"] = false);
        }
      } else if (config[key].type === "textInput") {
        submitFieldData.textInput[key] = value;
      } else if (config[key].type === "toggle") {
        submitFieldData.toggle[key] = value;
      } else if (config[key].type === "datetimepicker") {
        submitFieldData.runDate = new Date(value);
      }
    }
  }

  setSubmissionState({ type: "file_upload" });
}

export default Submit;
