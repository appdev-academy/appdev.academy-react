import React from 'react'
import { IndexRedirect, IndexRoute, Route } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'

// Authentication
import SignIn from './components/Authentication/SignIn'

// Dashboard
import Dashboards from './components/Dashboards/Main'

// Articles
import Articles from './components/Articles/Index'
import Article from './components/Articles/Show'
import NewArticle from './components/Articles/New'
import EditArticle from './components/Articles/Edit'

// Images
import Images from './components/Images/Index'

// Pages
import Pages from './components/Pages/Index'
import Page from './components/Pages/Show'
import EditPage from './components/Pages/Edit'

// Tags
import Tags from './components/Tags/Index'
import NewTag from './components/Tags/New'
import EditTag from './components/Tags/Edit'

// Projects
import Projects from './components/Projects/Index'
import Project from './components/Projects/Show'
import NewProject from './components/Projects/New'
import EditProject from './components/Projects/Edit'

// Topics
import Topics from './components/Topics/Index'
import NewTopic from './components/Topics/New'
import EditTopic from './components/Topics/Edit'

// Screencasts
import Screencasts from './components/Screencasts/Index'
import NewScreencast from './components/Screencasts/New'
import EditScreencast from './components/Screencasts/Edit'

// Lessons
import Lessons from './components/Lessons/Index'
import NewLesson from './components/Lessons/New'
import EditLesson from './components/Lessons/Edit'

export default (
  <Route path='/' component={ Root }>
    <IndexRoute component={ Dashboards } />
    <Route path='articles'>
      <IndexRoute component={ Articles } />
      <Route path='new' component={ NewArticle } />
      <Route path=':articleID/edit' component={ EditArticle } />
      <Route path=':articleID' component={ Article } />
    </Route>
    <Route path='images' component={ Images } />
    <Route path='pages'>
      <IndexRoute component={ Pages } />
      <Route path=':slug/edit' component={ EditPage } />
      <Route path=':slug' component={ Page } />
    </Route>
    <Route path='projects'>
      <IndexRoute component={ Projects } />
      <Route path='new' component={ NewProject } />
      <Route path=':projectID/edit' component={ EditProject } />
      <Route path=':projectID' component={ Project } />
    </Route>
    <Route path='tags'>
      <IndexRoute component={ Tags } />
      <Route path='new' component={ NewTag } />
      <Route path=':tagID/edit' component={ EditTag } />
    </Route>
    <Route path='topics'>
      <IndexRoute component={ Topics } />
      <Route path='new' component={ NewTopic } />
      <Route path=':topicID'>
        <Route path='edit' component={ EditTopic } />
        <Route path='screencasts'>
          <IndexRoute component={ Screencasts } />
          <Route path='new' component={ NewScreencast } />
          <Route path=':screencastID'>
            <Route path='edit' component={ EditScreencast } />
            <Route path='lessons'>
              <IndexRoute component={ Lessons } />
              <Route path='new' component={ NewLesson } />
              <Route path=':lessonID/edit' component={ EditLesson } />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path='sign-in' component={ SignIn } />
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)
