import React from "react";

const OverviewOptions = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {children}

    <button type="submit">Update</button>
  </form>
);

export default OverviewOptions;
