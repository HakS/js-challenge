import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import Main from "./components/main";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faStop, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faPlay, faStop, faPen, faTrash);

import './main.scss';

const Index = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById("index"));
