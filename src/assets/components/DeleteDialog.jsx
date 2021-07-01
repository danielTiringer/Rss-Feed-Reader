import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { RssContext } from '../contexts/RssContext';

const DeleteDialog = props => {
  const context = useContext(RssContext);

  const hide = () => {
    props.setDeleteConfirmationIsShown(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth='sm'
      open={props.open}
      onClose={hide}
    >
      <DialogTitle>Are you sure you want to delete this feed?</DialogTitle>
      <DialogContent>
        {props.rss.title}
      </DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancel</Button>
        <Button onClick={() => {
          context.deleteRss(props.rss);
          hide();
        }}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setDeleteConfirmationIsShown: PropTypes.func.isRequired,
  rss: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default DeleteDialog;
