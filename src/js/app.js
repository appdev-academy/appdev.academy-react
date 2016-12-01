import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

// Router
import routes from './routes'

import ArticlesStore from './stores/Articles'
import ArticleImagesStore from './stores/ArticleImages'
import SessionsStore from './stores/Sessions'

const sessionsStore = new SessionsStore()
const articlesStore = new ArticlesStore(sessionsStore)
const articleImagesStore = new ArticleImagesStore(sessionsStore)

ReactDOM.render(
  <Provider articlesStore={ articlesStore } articleImagesStore={ articleImagesStore } sessionsStore={ sessionsStore }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('body')
)