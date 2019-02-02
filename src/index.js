import React from "react";
import ReactDOM from "react-dom";

import Main from "./components/main";

import './main.scss';

const Index = () => (
  <Main></Main>
);

ReactDOM.render(<Index />, document.getElementById("index"));
