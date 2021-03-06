import axios from 'axios';
import React, { createContext } from 'react';

export const RssContext = createContext();

class RssContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      message: {},
    };
    this.readRss();
  }

  createRss(event, rss) {
    event.preventDefault();
    axios.post('/api/rss/create', rss)
         .then(response => {
           if (response.data.message.level === 'success') {
              let feeds = [...this.state.feeds];
              feeds.push(response.data.rss);
              this.setState({
                feeds: feeds,
              });
           }

           this.setState({
             message: response.data.message,
           });
         })
         .catch(error => console.error(error));
  }

  readRss() {
    axios.get('/api/rss/read')
         .then(response => {
           this.setState({
             feeds: response.data,
           })
         })
         .catch(error => console.error(error));
  }

  updateRss(data) {
    axios.put('/api/rss/update/' + data.id, data)
         .then(response => {
           if (response.data.message.level === 'success' && response.data.rss) {
              let feeds = [...this.state.feeds];
              let feed = feeds.find(feed => {
                return feed.id === response.data.rss.id
              });
              feed.title = response.data.rss.title;
              feed.url = response.data.rss.url;

              this.setState({
                feeds: feeds,
              });
           }

            this.setState({
              message: response.data.message,
            });
         })
         .catch(error => console.error(error));
  }

  deleteRss(data) {
    axios.delete('/api/rss/delete/' + data.id)
         .then(response => {
           if (response.data.message.level === 'success') {
              let feeds = [...this.state.feeds];
              let feed = feeds.find(rss => {
                return rss.id === data.id;
              });

              feeds.splice(feeds.indexOf(feed), 1);

              this.setState({
                feeds: feeds,
              });
           }

            this.setState({
              message: response.data.message,
            });
         })
         .catch(error => console.error(error));
  }

  setMessage(message) {
    this.setState({message: message});
  }

  render() {
    return (
      <RssContext.Provider value={{
        ...this.state,
        createRss: this.createRss.bind(this),
        updateRss: this.updateRss.bind(this),
        deleteRss: this.deleteRss.bind(this),
        setMessage: this.setMessage.bind(this),
      }}>
        {this.props.children}
      </RssContext.Provider>
    )
  }
}

export default RssContextProvider;
