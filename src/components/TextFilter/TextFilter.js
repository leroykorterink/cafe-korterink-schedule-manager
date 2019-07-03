import React from "react";
import { withRouter } from "react-router-dom";
import KeyNames from "../../enum/KeyNames";
import updateSearchParameters from "../../util/updateSearchParameters";

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: new URLSearchParams(window.location.search).get(props.name) || ""
    };

    this.updateSearchQuery();
  }

  updateSearchQuery() {
    const { name, history } = this.props;
    const { value } = this.state;

    const newPath = updateSearchParameters({ [name]: value });

    if (newPath.search === window.location.search) {
      return;
    }

    history.replace({ search: newPath.search });
  }

  handleBlur = e => {
    this.setState(
      {
        value: e.target.value
      },
      this.updateSearchQuery
    );
  };

  handleKeyDown = e => {
    if (e.key !== KeyNames.ENTER) {
      return;
    }

    e.target.blur();
  };

  render() {
    const { name } = this.props;
    const { value } = this.state;

    return (
      <input
        type="text"
        defaultValue={value}
        name={name}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default withRouter(SearchFilter);
