import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Button from "../general/Button";
import style from "./OverviewOptions.module.scss";

const OverviewOptions = ({ children, className, backLink }) => (
  <div className={classNames(style.OverviewOptions, className)}>
    <div>{children}</div>

    <Button.Hollow small className={style.right} to={backLink}>
      Terug naar overzicht
    </Button.Hollow>
  </div>
);

OverviewOptions.propTypes = {
  backLink: PropTypes.string.isRequired
};

export default OverviewOptions;
