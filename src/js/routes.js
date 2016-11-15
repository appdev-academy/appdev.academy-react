import React from 'react'
import { Route } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'
import Admin from './components/Admin'
import Articles from './components/Articles'

export default (
  <Route path='/' component={ Root }>
    <Route path='admin' component={ Admin }>
      <Route path='articles' component={ Articles } />
    </Route>
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)