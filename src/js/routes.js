import React from 'react'
import { Route } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'
import Admin from './components/Admin'
import Articles from './components/Articles'
import Article from './components/Article'
import NewArticle from './components/NewArticle'
import EditArticle from './components/EditArticle'
import UploadPicture from './components/UploadPicture'

export default (
  <Route path='/' component={ Root }>
    <Route path='admin' component={ Admin }>
      <Route path='articles' component={ Articles } />
      <Route path='pictures/new' component={ UploadPicture } />
      <Route path='articles/new' component={ NewArticle } />
      <Route path='articles/:articleID/edit' component={ EditArticle } />
      <Route path='articles/:articleID' component={ Article } />
    </Route>
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)