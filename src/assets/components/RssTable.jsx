import React, { useContext } from 'react';
import { RssContext } from '../contexts/RssContext';

const RssTable = () => {
  const context = useContext(RssContext);

  return (
    <div>
      {context.feeds.map(rss => (
        <div>{rss.title}</div>
      ))}
    </div>
  );
}

export default RssTable;
