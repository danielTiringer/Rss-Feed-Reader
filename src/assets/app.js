/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import RssContextProvider from './contexts/RssContext';
import RssTable from './components/RssTable';

const App = () => {
    return (
      <RssContextProvider>
        <CssBaseline>
          <RssTable/>
        </CssBaseline>
      </RssContextProvider>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));
