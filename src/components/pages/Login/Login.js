import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { LoginSuccessPath } from "../../../enum/RoutePaths";
import { AuthContext } from "../../AuthContext";
import LoginButton from "../../LoginButton";
import style from "./Login.module.scss";

const Login = () => {
  const { auth2 } = useContext(AuthContext);

  if (auth2.isSignedIn.get()) {
    return <Redirect to={LoginSuccessPath} />;
  }

  return (
    <p className={style.wrapper}>
      <LoginButton auth2={auth2} /> om het rooster te bekijken.
    </p>
  );
};

export default withRouter((props) => (
  <AuthContext.Consumer>
    {(context) => <Login {...props} {...context} />}
  </AuthContext.Consumer>
));
