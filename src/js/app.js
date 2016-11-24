import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

// Router
import routes from './routes'

import ArticlesStore from './stores/Articles';
import ArticleImagesStore from './stores/ArticleImages'

const articlesStore = new ArticlesStore()
const articleImagesStore = new ArticleImagesStore()

ReactDOM.render(
  <Provider articlesStore={ articlesStore } articleImagesStore={ articleImagesStore }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('body')
)