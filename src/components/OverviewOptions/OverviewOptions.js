import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import style from "./OverviewOptions.module.scss";

const OverviewOptions = ({ children, backLink }) => (
  <div className={style.OverviewOptions}>
    <div>{children}</div>

    <Link className={style.right} to={backLink}>
      Terug naar overzicht
    </Link>
  </div>
);

OverviewOptions.propTypes = {
  backLink: PropTypes.string.isRequired
};

export default OverviewOptions;
