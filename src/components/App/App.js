/* global gapi */
import React from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import config from "../../data/config";
import RoutePaths from "../../enum/RoutePaths";
import { AuthContext } from "../AuthContext";
import style from "./App.module.scss";

// Pages
import Home from "../Home";
import Login from "../Login";

class App extends React.Component {
  state = {
    gapiLoaded: false
  };

  componentDidMount() {
    gapi.load(config.gapi.modules, this.onGapiLoaded);
  }

  onGapiLoaded = async () => {
    const auth2 = await gapi.auth2.init({
      client_id: config.gapi.auth2.clientId,
      scope: config.gapi.auth2.scope
    });

    this.props.handleAuth2Init(auth2);

    this.setState({
      gapiLoaded: true
    });
  };

  render() {
    if (!this.state.gapiLoaded) {
      return "";
    }

    if (
      this.props.location.pathname !== RoutePaths.LOGIN &&
      !this.props.auth2.isSignedIn.get()
    ) {
      return <Redirect to={RoutePaths.LOGIN} />;
    }

    return (
      <div className={style.App}>
        <AuthContext.Consumer>
          {context => (
            <Switch>
              <Route
                exact
                path={RoutePaths.LOGIN}
                render={() => <Login {...context} />}
              />
              <Route render={() => <Home {...context} />} />
            </Switch>
          )}
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default withRouter(App);
