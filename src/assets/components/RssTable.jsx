import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useState } from 'react';
import { RssContext } from '../contexts/RssContext';

const RssTable = () => {
  const context = useContext(RssContext);
  const [rssTitle, setRssTitle] = useState('');
  const [rssUrl, setRssUrl] = useState('');

  return (
    <form onSubmit={event => {context.createRss(event, {title: rssTitle, url: rssUrl})}}>
      <Table>
        <TableHead>
            <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Url</TableCell>
            <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>
                  <TextField value={rssTitle} onChange={event => {setRssTitle(event.target.value)}} label="Title of new RSS feed"/>
                </TableCell>
                <TableCell>
                  <TextField value={rssUrl} onChange={event => {setRssUrl(event.target.value)}} label="Url of new RSS feed"/>
                </TableCell>
                <TableCell>
                  <IconButton type="submit">
                    <AddIcon/>
                  </IconButton>
                </TableCell>
            </TableRow>
          {context.feeds.slice().reverse().map((rss, index) => (
            <TableRow key={'rss' + index}>
                <TableCell>{rss.title}</TableCell>
                <TableCell>{rss.url}</TableCell>
                <TableCell>
                <IconButton>
                    <EditIcon/>
                </IconButton>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </form>
  );
}

export default RssTable;
