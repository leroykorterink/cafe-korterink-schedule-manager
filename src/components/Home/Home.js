import React from "react";
import LoginButton from "../LoginButton";

class Home extends React.Component {
  render() {
    return (
      <div>
        Homee
        <LoginButton auth2={this.props.auth2} />
      </div>
    );
  }
}

export default Home;
