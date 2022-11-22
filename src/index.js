import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import Plausible from "plausible-tracker";

const { enableAutoPageviews } = Plausible({
  domain: "https://statscollide.com",
});
enableAutoPageviews();

const header = ReactDOM.createRoot(document.getElementById("root"));
header.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
