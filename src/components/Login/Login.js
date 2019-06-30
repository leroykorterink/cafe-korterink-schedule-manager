import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { LoginSuccessPath } from "../../enum/RoutePaths";

const Login = props => {
  if (props.auth2.isSignedIn.get()) {
    return <Redirect to={LoginSuccessPath} />;
  }

  return <div>Login page</div>;
};

export default withRouter(Login);
