import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { LoginSuccessPath } from "../../enum/RoutePaths";
import LoginButton from "../LoginButton";

const Login = props => {
  if (props.auth2.isSignedIn.get()) {
    return <Redirect to={LoginSuccessPath} />;
  }

  return (
    <div>
      <LoginButton auth2={props.auth2} />
    </div>
  );
};

export default withRouter(Login);
