import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

// Router
import routes from './routes'

import ArticlesStore from './stores/Articles'
import DashboardsStore from './stores/Dashboards'
import ImagesStore from './stores/Images'
import PagesStore from './stores/Pages'
import ProjectsStore from './stores/Projects'
import ScreencastsStore from './stores/Screencasts'
import SessionsStore from './stores/Sessions'
import TopicsStore from './stores/Topics'

const sessionsStore = new SessionsStore()
const articlesStore = new ArticlesStore(sessionsStore)
const dashboardsStore = new DashboardsStore(sessionsStore)
const imagesStore = new ImagesStore(sessionsStore)
const pagesStore = new PagesStore(sessionsStore)
const projectsStore = new ProjectsStore(sessionsStore)
const screencastsStore = new ScreencastsStore(sessionsStore)
const topicsStore = new TopicsStore(sessionsStore)

ReactDOM.render(
  <Provider articlesStore={ articlesStore }
            dashboardsStore= { dashboardsStore }
            imagesStore={ imagesStore }
            pagesStore={ pagesStore }
            projectsStore= { projectsStore }
            screencastsStore = { screencastsStore }
            sessionsStore={ sessionsStore }
            topicsStore= { topicsStore }
  >
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('body')
)
