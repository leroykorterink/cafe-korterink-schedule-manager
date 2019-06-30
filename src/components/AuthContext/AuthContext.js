import React from "react";

export const AuthContext = React.createContext({
  auth2: null,
  handleAuth2Init: () => null
});

export default class extends React.Component {
  constructor() {
    super();

    this.handleAuth2Init = auth2 => {
      return new Promise(resolve => {
        this.setState({ auth2 }, resolve);
      });
    };

    this.state = {
      auth2: null,
      handleAuth2Init: this.handleAuth2Init
    };
  }

  render() {
    const { children } = this.props;

    return (
      <AuthContext.Provider value={this.state}>
        {React.cloneElement(children, this.state)}
      </AuthContext.Provider>
    );
  }
}
