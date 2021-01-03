/* global gapi */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import config from "../../data/config";
import RoutePaths from "../../enum/RoutePaths";
import Header from "../Header";
import Calendar from "../pages/Calendar";
import CalenderSelection from "../pages/CalenderSelection";
import Employees from "../pages/Employees";
import Login from "../pages/Login";
import style from "./App.module.scss";

class App extends React.Component {
  state = {
    gapiLoaded: false,
  };

  componentDidMount() {
    gapi.load(config.gapi.modules, this.onGapiLoaded);
  }

  onGapiLoaded = async () => {
    await gapi.client.init({
      clientId: config.gapi.clientId,
      discoveryDocs: config.gapi.discoveryDocs,
      scope: config.gapi.scopes.join(" "),
    });

    this.props.handleAuth2Init(gapi.auth2.getAuthInstance());

    this.setState({
      gapiLoaded: true,
    });
  };

  render() {
    if (!this.state.gapiLoaded) {
      return "";
    }

    const isSignedIn = this.props.auth2.isSignedIn.get();
    const isLoginRoute = this.props.location.pathname === RoutePaths.LOGIN;

    if (!isSignedIn && !isLoginRoute) {
      return <Redirect to={RoutePaths.LOGIN} />;
    }

    return (
      <div className={style.App}>
        <Header />

        <Switch>
          <Route exact path={RoutePaths.LOGIN} component={Login} />

          <Route
            exact
            path={RoutePaths.CALENDAR_SELECTION}
            component={CalenderSelection}
          />

          <Route exact path={RoutePaths.CALENDAR} component={Calendar} />
          <Route exact path={RoutePaths.EMPLOYEES} component={Employees} />

          <Redirect to={RoutePaths.CALENDAR_SELECTION} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
