import React from "react";
import { withRouter } from "react-router-dom";
import { LoginSuccessPath, LogoutSuccessPath } from "../../enum/RoutePaths";
import Button from "../general/Button";

class LoginButton extends React.Component {
  handleClick = async () => {
    const isSignedIn = this.props.auth2.isSignedIn.get();

    if (isSignedIn) {
      await this.props.auth2.signOut();
      this.props.history.push(LogoutSuccessPath);

      return;
    }

    await this.props.auth2.signIn();
    this.props.history.push(LoginSuccessPath);
  };

  render() {
    const isSignedIn = this.props.auth2.isSignedIn.get();

    const Component = ({ children, ...props }) => (
      <Button
        {...props}
        className={this.props.className}
        onClick={this.handleClick}
      >
        {children}
      </Button>
    );

    if (isSignedIn) {
      return <Component>Uitloggen</Component>;
    }

    return <Component>Inloggen</Component>;
  }
}

export default withRouter(LoginButton);
