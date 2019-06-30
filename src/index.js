import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import AuthContext from "./components/AuthContext";
import * as serviceWorker from "./serviceWorker";

import "./util/normalize.scss";
import "./index.scss";

const bootstrap = (
  <Router>
    <AuthContext>
      <App />
    </AuthContext>
  </Router>
);

ReactDOM.render(bootstrap, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
