import classNames from "classnames";
import React from "react";
import style from "./Input.module.scss";

const Input = ({ label, standalone, type, ...props }) => {
  let Component = "input";

  const attributes = {};

  if (type === "textarea") {
    Component = "textarea";
  } else {
    attributes.type = type;
  }

  const className = classNames(style.Input, style[type], props.className, {
    [style.hasLabel]: label,
    [style.standalone]: standalone
  });

  return (
    <div className={className}>
      <Component
        {...attributes}
        {...props}
        placeholder=" "
        id={props.name}
        className={style.component}
      />

      <label htmlFor={props.name} className={style.label}>
        {label}
      </label>
    </div>
  );
};

export default Input;
