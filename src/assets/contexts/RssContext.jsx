import React, { createContext } from 'react';

export const RssContext = createContext();

class RssContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [
        {title: 'Some title', url: 'http://localhost'},
        {title: 'Some title', url: 'http://localhost'},
        {title: 'Some title', url: 'http://localhost'},
      ],
    };
  }

  createRss() {

  }

  readRss() {

  }

  updateRss() {

  }

  deleteRss() {

  }

  render() {
    return (
      <RssContext.Provider value={{
        ...this.state,
        createRss: this.createRss.bind(this),
        updateRss: this.updateRss.bind(this),
        deleteRss: this.deleteRss.bind(this),
      }}>
        {this.props.children}
      </RssContext.Provider>
    )
  }
}

export default RssContextProvider;
