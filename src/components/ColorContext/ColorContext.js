/* global gapi */
import React from "react";
import style from "./ColorContext.module.scss";

export const ColorContext = React.createContext({
  getColor: () => ({}),
});

const EMPTY_OBJECT = {};

class ColorContextComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      calendar: null,
      event: null,
      isLoading: true,
      hasLoadedColors: false,
    };

    this.contextValue = {
      getCalendarColor: this.getCalendarColor,
      getEventColor: this.getEventColor,
    };
  }

  async componentDidMount() {
    if (this.state.hasLoadedColors) {
      return;
    }

    const response = await gapi.client.calendar.colors.get().getPromise();

    this.setState({
      ...response.result,
      isLoading: false,
      didLoad: true,
    });
  }

  getCalendarColor = (colorId) =>
    this.state.calendar ? this.state.calendar[colorId] : EMPTY_OBJECT;

  getEventColor = (colorId) =>
    this.state.event ? this.state.event[colorId] : EMPTY_OBJECT;

  render() {
    const { children } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <div className={style.loader}>Loading data</div>;
    }

    return (
      <ColorContext.Provider value={this.contextValue}>
        {children}
      </ColorContext.Provider>
    );
  }
}

export default ColorContextComponent;
