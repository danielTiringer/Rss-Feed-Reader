import { Button, Snackbar, SnackbarContent } from '@material-ui/core';
import React, { Fragment, useContext } from 'react';
import { RssContext } from '../contexts/RssContext';

const AppSnackbar = () => {
  const context = useContext(RssContext);

  return (
    <Snackbar
      autoHideDuration={6000}
      open={context.message.text !== undefined}
    >
      {context.message.text && (
        <SnackbarContent
          message={context.message.text.map((text, index) => (
            <Fragment key={index + ' ' + text}>
              <span>{text}</span>
              <br/>
            </Fragment>
          ))}
          action={[
            <Button
              onClick={() => {context.setMessage({})}}
              key='dismiss'
            >Dismiss</Button>
          ]}
        />
      )}
    </Snackbar>
  )
}

export default AppSnackbar;
