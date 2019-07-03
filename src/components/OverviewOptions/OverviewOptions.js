import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Button from "../general/Button";
import style from "./OverviewOptions.module.scss";

const OverviewOptions = ({
  children,
  className,
  backLink,
  title = "Overview"
}) => (
  <div className={classNames(style.OverviewOptions, className)}>
    <div className={style.actions}>
      <h2 className={style.title}>{title}</h2>

      <Button.Hollow small className={style.right} to={backLink}>
        Terug naar overzicht
      </Button.Hollow>
    </div>

    <div className={style.filters}>{children}</div>
  </div>
);

OverviewOptions.propTypes = {
  backLink: PropTypes.string.isRequired
};

export default OverviewOptions;
