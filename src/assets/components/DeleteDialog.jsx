import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const DeleteDialog = props => {
  return (
    <Dialog open={props.open}>
      <DialogTitle>Are you sure you want to delete this feed?</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default DeleteDialog;
