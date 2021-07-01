import React, { createContext } from 'react';

export const RssContext = createContext();

class RssContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [
        {id: 1, title: 'Some title', url: 'http://localhost'},
        {id: 2, title: 'Some title', url: 'http://localhost'},
        {id: 3, title: 'Some title', url: 'http://localhost'},
      ],
    };
  }

  createRss(event, rss) {
    event.preventDefault();
    let feeds = [...this.state.feeds];
    feeds.push(rss);
    this.setState({
      feeds: feeds,
    })
  }

  readRss() {

  }

  updateRss(data) {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(feed => {
      return feed.id === data.id
    });
    feed.title = data.title;
    feed.url = data.url;

    this.setState({
      feeds: feeds,
    });
  }

  deleteRss(data) {
    let feeds = [...this.state.feeds];
    let feed = feeds.find(rss => {
      return rss.id === data.id;
    });

    feeds.splice(feeds.indexOf(feed), 1);

    this.setState({
      feeds: feeds,
    });
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
