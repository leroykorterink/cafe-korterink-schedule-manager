import React from "react";
import { withRouter } from "react-router-dom";
import KeyNames from "../../enum/KeyNames";
import updateSearchParameters from "../../util/updateSearchParameters";
import Input from "../general/Input";

class TextFilter extends React.Component {
  constructor(props) {
    super(props);

    const defaultValue =
      new URLSearchParams(window.location.search).get(props.name) ||
      props.defaultValue ||
      "";

    this.state = {
      value: defaultValue
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
    const { history, location, match, staticContext, ...props } = this.props;
    const { value } = this.state;

    return (
      <Input
        {...props}
        defaultValue={value}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default withRouter(TextFilter);
