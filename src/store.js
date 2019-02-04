import { createStore } from "redux";
import rootReducer from "./reducers/index";
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(throttle(() => {
  // TODO: do not call the save function every time the state changes
  saveState({
    clips: store.getState().clips
  })
}, 1000))

export default store;
