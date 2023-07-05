import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Camera from "./camera";
import "./style/index.css";
const root = ReactDOM.createRoot(document.getElementById("webcam"));
root.render(
  <React.StrictMode>
    <App />
    <Camera />
  </React.StrictMode>
);


