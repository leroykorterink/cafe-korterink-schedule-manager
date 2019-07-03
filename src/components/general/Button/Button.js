import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import style from "./Button.module.scss";

const Button = ({ children, small, ...props }) => {
  let defaultAttributes = {};
  let Component = "button";

  if (props.href) {
    Component = "a";
    defaultAttributes.type = "_blank";
  }

  if (props.to) {
    Component = Link;
  }

  const classname = classNames(props.className, style.Button, {
    [style.small]: small
  });

  return (
    <Component {...defaultAttributes} {...props} className={classname}>
      {children}
    </Component>
  );
};

Button.Solid = props => (
  <Button {...props} className={classNames(style.Solid, props.className)} />
);

Button.Hollow = props => (
  <Button {...props} className={classNames(style.Hollow, props.className)} />
);

export default Button;
