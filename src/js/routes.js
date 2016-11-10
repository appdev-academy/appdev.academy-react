import React from 'react'
import { Route } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'
import Admin from './components/Admin'
import ArticlesContainer from './redux/containers/ArticlesContainer'
import ArticleContainer from './redux/containers/ArticleContainer'

export default (
  <Route path='/' component={ Root }>
    <Route path='admin' component={ Admin }>
      <Route path='articles' component={ ArticlesContainer } />
      <Route path='articles/:articleID' component={ ArticleContainer } />
    </Route>
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)