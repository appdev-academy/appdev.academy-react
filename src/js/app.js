import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

// Router
import routes from './routes'

import ArticlesStore from './stores/Articles'
import DashboardsStore from './stores/Dashboards'
import GalleryImagesStore from './stores/GalleryImages'
import ImagesStore from './stores/Images'
import LessonsStore from './stores/Lessons'
import PagesStore from './stores/Pages'
import ProjectsStore from './stores/Projects'
import ScreencastsStore from './stores/Screencasts'
import SessionsStore from './stores/Sessions'
import TagsStore from './stores/Tags'
import TopicsStore from './stores/Topics'

const sessionsStore = new SessionsStore()
const articlesStore = new ArticlesStore(sessionsStore)
const dashboardsStore = new DashboardsStore(sessionsStore)
const galleryImagesStore = new GalleryImagesStore(sessionsStore)
const imagesStore = new ImagesStore(sessionsStore)
const lessonsStore = new LessonsStore(sessionsStore)
const pagesStore = new PagesStore(sessionsStore)
const projectsStore = new ProjectsStore(sessionsStore)
const screencastsStore = new ScreencastsStore(sessionsStore)
const tagsStore = new TagsStore(sessionsStore)
const topicsStore = new TopicsStore(sessionsStore)

ReactDOM.render(
  <Provider
    articlesStore={ articlesStore }
    dashboardsStore= { dashboardsStore }
    imagesStore={ imagesStore }
    galleryImagesStore={ galleryImagesStore }
    lessonsStore={ lessonsStore }
    pagesStore={ pagesStore }
    projectsStore= { projectsStore }
    screencastsStore = { screencastsStore }
    sessionsStore={ sessionsStore }
    tagsStore= { tagsStore }
    topicsStore= { topicsStore }
  >
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('body')
)
