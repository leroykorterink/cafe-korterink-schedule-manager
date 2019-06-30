import React from "react";
import LoginButton from "../LoginButton";
import { AuthContext } from "../AuthContext";
import style from "./Header.module.scss";

const Header = () => (
  <header className={style.Header}>
    <h1 className={style.logo}>CKRBS</h1>

    <AuthContext.Consumer>
      {({ auth2 }) => (
        <LoginButton auth2={auth2} className={style.loginButton} />
      )}
    </AuthContext.Consumer>
  </header>
);

export default Header;
