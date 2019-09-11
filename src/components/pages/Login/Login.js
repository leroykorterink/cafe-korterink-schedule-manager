import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { LoginSuccessPath } from "../../../enum/RoutePaths";
import { AuthContext } from "../../AuthContext";

const Login = props => {
  if (props.auth2.isSignedIn.get()) {
    return <Redirect to={LoginSuccessPath} />;
  }

  return <div>Login page</div>;
};

export default withRouter(props => (
  <AuthContext.Consumer>
    {context => <Login {...props} {...context} />}
  </AuthContext.Consumer>
));
