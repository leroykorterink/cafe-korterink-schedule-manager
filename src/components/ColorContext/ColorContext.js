/* global gapi */
import React from "react";

export const ColorContext = React.createContext({
  getColor: () => ({})
});

const EMPTY_OBJECT = {};

class ColorContextComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      calendar: {},
      event: {},
      isLoading: true
    };

    this.contextValue = {
      getCalendarColor: this.getCalendarColor,
      getEventColor: this.getEventColor
    };
  }

  async componentDidMount() {
    const response = await gapi.client.calendar.colors.get().getPromise();

    this.setState({
      ...response.result,
      isLoading: false
    });
  }

  getCalendarColor = colorId => this.state.calendar[colorId] || EMPTY_OBJECT;
  getEventColor = colorId => this.state.event[colorId] || EMPTY_OBJECT;

  render() {
    const { children } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return "Loading data";
    }

    return (
      <ColorContext.Provider value={this.contextValue}>
        {React.cloneElement(children)}
      </ColorContext.Provider>
    );
  }
}

export default ColorContextComponent;
