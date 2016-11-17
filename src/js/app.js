import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react';

// Router
import routes from './routes'

import AppState from './stores/AppState';

const appState = new AppState();

ReactDOM.render(
  <Provider appState={ appState }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('body')
)