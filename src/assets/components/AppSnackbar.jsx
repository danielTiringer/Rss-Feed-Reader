import { Button, Snackbar, SnackbarContent } from '@material-ui/core';
import React, { useContext } from 'react';
import { RssContext } from '../contexts/RssContext';

const AppSnackbar = () => {
  const context = useContext(RssContext);

  return (
    <Snackbar
      autoHideDuration={6000}
      open={context.message.text !== undefined}
    >
      <SnackbarContent
        message={context.message.text}
        action={[
          <Button key='dismiss'>Dismiss</Button>
        ]}
      />
    </Snackbar>
  )
}

export default AppSnackbar;
