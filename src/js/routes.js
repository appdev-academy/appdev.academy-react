import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'

export default (
  <Route path='/' component={ Root }>
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)