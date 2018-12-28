import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App";
import { Provider } from "react-redux";
import grid from "./store/reducers/grid";
import { createStore, combineReducers } from "redux";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  grid: grid
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
