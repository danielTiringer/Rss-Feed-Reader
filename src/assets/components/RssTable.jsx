import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useState, Fragment } from 'react';
import DeleteDialog from './DeleteDialog';
import { RssContext } from '../contexts/RssContext';

const RssTable = () => {
  const context = useContext(RssContext);
  const [addTitle, setAddTitle] = useState('');
  const [addUrl, setAddUrl] = useState('');
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
  const [rssToBeDeleted, setRssToBeDeleted] = useState(null);
  const [editIsShown, setEditIsShown] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');

  const onCreateSubmit = event => {
    event.preventDefault();
    context.createRss(event, {
      title: addTitle,
      url: addUrl,
    });
    setAddTitle('');
    setAddUrl('');
  }

  const onEditSubmit = (rssId, event) => {
    event.preventDefault();
    context.updateRss({
      id: rssId,
      title: editTitle,
      url: editUrl,
    });
    setEditIsShown(false);
  }

  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Url</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <form onSubmit={onCreateSubmit}>
                <TextField
                  type="text"
                  value={addTitle}
                  onChange={event => {setAddTitle(event.target.value)}}
                  label="Title of new RSS feed"
                />
              </form>
            </TableCell>
            <TableCell>
              <form>
                <TextField
                  type="text"
                  value={addUrl}
                  onChange={event => {setAddUrl(event.target.value)}}
                  label="Url of new RSS feed"
                />
              </form>
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={onCreateSubmit}>
                <AddIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
          {context.feeds.slice().reverse().map((rss, index) => (
            <TableRow key={'rss' + index}>
                <TableCell>
                  {
                    editIsShown === rss.id
                      ?
                    <TextField
                      type="text"
                      value={editTitle}
                      onChange={event => setEditTitle(event.target.value)}
                    />
                      :
                    rss.title
                  }
                </TableCell>
                <TableCell>
                  {
                    editIsShown === rss.id
                      ?
                    <TextField
                      type="text"
                      value={editUrl}
                      onChange={event => setEditUrl(event.target.value)}
                    />
                      :
                    rss.url
                  }
                </TableCell>
                <TableCell align="right">
                  {
                    editIsShown === rss.id &&
                    <Fragment>
                      <IconButton onClick={() => {
                        setEditIsShown(false);
                      }}>
                        <CloseIcon/>
                      </IconButton>
                      <IconButton onClick={onEditSubmit.bind(this, rss.id)}>
                        <DoneIcon/>
                      </IconButton>
                    </Fragment>
                  }
                  <IconButton onClick={() => {
                    setEditIsShown(rss.id);
                    setEditTitle(rss.title);
                    setEditUrl(rss.url);
                  }}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={() => {
                  setDeleteConfirmationIsShown(true);
                  setRssToBeDeleted(rss);
                }}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>

      {deleteConfirmationIsShown && (
        <DeleteDialog
          rss={rssToBeDeleted}
          open={deleteConfirmationIsShown}
          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
        />
      )}
    </Fragment>
  );
}

export default RssTable;
