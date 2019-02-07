import { createStore } from "redux";
import rootReducer from "./reducers/index";
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(throttle(() => {
  // TODO: do not call the save function every time the state changes
  const currentState = store.getState();
  saveState({
    clips: currentState.clips,
    availableTags: currentState.availableTags
  })
}, 1000))

export default store;
