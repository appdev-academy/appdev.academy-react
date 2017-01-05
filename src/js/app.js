import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

// Router
import routes from './routes'

import ArticlesStore from './stores/Articles'
import ImagesStore from './stores/Images'
import PagesStore from './stores/Pages'
import ProjectsStore from './stores/Projects'
import SessionsStore from './stores/Sessions'

const sessionsStore = new SessionsStore()
const articlesStore = new ArticlesStore(sessionsStore)
const imagesStore = new ImagesStore(sessionsStore)
const pagesStore = new PagesStore(sessionsStore)
const projectsStore = new ProjectsStore(sessionsStore)

ReactDOM.render(
  <Provider articlesStore={ articlesStore } imagesStore={ imagesStore } pagesStore={ pagesStore } projectsStore= { projectsStore } sessionsStore={ sessionsStore }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('body')
)