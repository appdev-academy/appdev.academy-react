import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

// Router
import routes from './routes'

import ArticlesStore from './stores/Articles'
import ArticleImagesStore from './stores/ArticleImages'
import PagesStore from './stores/Pages'
import SessionsStore from './stores/Sessions'

const sessionsStore = new SessionsStore()
const articlesStore = new ArticlesStore(sessionsStore)
const articleImagesStore = new ArticleImagesStore(sessionsStore)
const pagesStore = new PagesStore(sessionsStore)

// Initialize Google Analytics
ReactGA.initialize('UA-46802250-3')

function trackPageview() {
  ReactGA.pageview(window.location.pathname)
}

ReactDOM.render(
  <Provider articlesStore={ articlesStore } articleImagesStore={ articleImagesStore } pagesStore={ pagesStore } sessionsStore={ sessionsStore }>
    <Router history={ browserHistory } routes={ routes } onUpdate={ trackPageview } />
  </Provider>,
  document.getElementById('body')
)