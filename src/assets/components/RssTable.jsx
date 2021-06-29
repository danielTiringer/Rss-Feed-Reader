import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext } from 'react';
import { RssContext } from '../contexts/RssContext';

const RssTable = () => {
  const context = useContext(RssContext);

  return (
    <form>
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
                    <TextField label="Title of new RSS feed"/>
                </TableCell>
                <TableCell>
                    <TextField label="Url of new RSS feed"/>
                </TableCell>
                <TableCell>
                    <IconButton>
                    <AddIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            {context.feeds.map((rss, index) => (
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
