import React from "react";
import LoginButton from "../LoginButton";
import { AuthContext } from "../AuthContext";
import style from "./Header.module.scss";

const Header = () => (
  <header className={style.Header}>
    <div className={style.wrapper}>
      <h1 className={style.logo}>Planning</h1>

      <AuthContext.Consumer>
        {({ auth2 }) => (
          <LoginButton auth2={auth2} className={style.loginButton} />
        )}
      </AuthContext.Consumer>
    </div>
  </header>
);

export default Header;
