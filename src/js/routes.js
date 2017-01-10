import React from 'react'
import { IndexRedirect, IndexRoute, Route } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'

import SignIn from './components/Authentication/SignIn'
import Dashboards from './components/Dashboards/Main'
import Articles from './components/Articles/Index'
import Article from './components/Articles/Show'
import NewArticle from './components/Articles/New'
import EditArticle from './components/Articles/Edit'
import Images from './components/Images/Index'
import Pages from './components/Pages/Index'
import Page from './components/Pages/Show'
import EditPage from './components/Pages/Edit'
import Projects from './components/Projects/Index'
import Project from './components/Projects/Show'
import NewProject from './components/Projects/New'
import EditProject from './components/Projects/Edit'

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
    <Route path='sign-in' component={ SignIn } />
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)