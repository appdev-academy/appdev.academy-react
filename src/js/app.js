import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

// Router
import routes from './routes'

import AppState from './stores/AppState';
import ArticleImages from './stores/ArticleImages'

const appState = new AppState()
const articleImages = new ArticleImages()

ReactDOM.render(
  <Provider appState={ appState } articleImages={ articleImages }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('body')
)