import React from 'react'
import { Route } from 'react-router'

import Root from './components/Root/Root'
import NotFound from './components/Root/NotFound'
import Admin from './components/Root/Admin'

import Articles from './components/Articles/Index'
import Article from './components/Articles/Show'
import NewArticle from './components/Articles/New'
import EditArticle from './components/Articles/Edit'

import ArticleImages from './components/ArticleImages/Index'

export default (
  <Route path='/' component={ Root }>
    <Route path='admin' component={ Admin }>
      <Route path='articles' component={ Articles } />
      <Route path='articles/new' component={ NewArticle } />
      <Route path='articles/:articleID/edit' component={ EditArticle } />
      <Route path='articles/:articleID' component={ Article } />
      <Route path='article_images' component={ ArticleImages } />
    </Route>
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)