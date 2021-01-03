import React from "react";
import LoginButton from "../LoginButton";
import { AuthContext } from "../AuthContext";
import style from "./Header.module.scss";
import Button from "../general/Button";
import RoutePaths from "../../enum/RoutePaths";

const Header = () => (
  <header className={style.Header}>
    <div className={style.wrapper}>
      <Button to="/" className={style.logo}>
        <h1>Planning</h1>
      </Button>

      <div className={style.buttons}>
        <Button className={style.button} to={RoutePaths.CALENDAR}>
          Kalenders
        </Button>

        <Button className={style.button} to={RoutePaths.EMPLOYEES}>
          Personeel
        </Button>

        <AuthContext.Consumer>
          {({ auth2 }) => (
            <LoginButton auth2={auth2} className={style.button} />
          )}
        </AuthContext.Consumer>
      </div>
    </div>
  </header>
);

export default Header;
