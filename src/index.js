import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import Main from "./components/main";

import './main.scss';

const Index = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById("index"));
