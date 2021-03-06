import { Button, Snackbar, SnackbarContent } from '@material-ui/core';
import React, { Fragment, useContext } from 'react';
import { RssContext } from '../contexts/RssContext';

const checkLevel = level => {
  switch(level) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    default:
      return 'white';
  }
}

const AppSnackbar = () => {
  const context = useContext(RssContext);

  return (
    <Snackbar
      autoHideDuration={6000}
      open={context.message.text !== undefined}
    >
      {context.message.text && (
        <SnackbarContent
          style={{backgroundColor: checkLevel(context.message.level), whiteSpace: 'pre'}}
          message={context.message.text}
          action={[
            <Button
              onClick={() => {context.setMessage({})}}
              key='dismiss'
              color='inherit'
            >Dismiss</Button>
          ]}
        />
      )}
    </Snackbar>
  )
}

export default AppSnackbar;
