import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { RssContext } from '../contexts/RssContext';

const DeleteDialog = props => {
  const context = useContext(RssContext);

  return (
    <Dialog open={props.open}>
      <DialogTitle>Are you sure you want to delete this feed?</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setDeleteConfirmationIsShown(false)}>Cancel</Button>
        <Button onClick={() => context.deleteRss({id: 0, name: ''})}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setDeleteConfirmationIsShown: PropTypes.func.isRequired,
};

export default DeleteDialog;
