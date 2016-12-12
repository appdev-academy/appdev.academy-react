import React from 'react'
import { IndexRedirect, IndexRoute, Route } from 'react-router'

import Root from './components/Shared/Root'
import NotFound from './components/Shared/NotFound'

import Admin from './components/Admin/Index'
import AdminSignIn from './components/Admin/Authentication/SignIn'
import AdminArticles from './components/Admin/Articles/Index'
import AdminArticle from './components/Admin/Articles/Show'
import AdminNewArticle from './components/Admin/Articles/New'
import AdminEditArticle from './components/Admin/Articles/Edit'
import AdminArticleImages from './components/Admin/ArticleImages/Index'
import AdminPages from './components/Admin/Pages/Index'
import AdminPage from './components/Admin/Pages/Show'
import AdminEditPage from './components/Admin/Pages/Edit'

import ShowPage from './components/Frontend/Pages/Show'

export default (
  <Route path='/' component={ Root }>
    <Route path='admin' component={ Admin }>
      <IndexRedirect to='articles' />
      <Route path='articles'>
        <IndexRoute component={ AdminArticles } />
        <Route path='new' component={ AdminNewArticle } />
        <Route path=':articleID/edit' component={ AdminEditArticle } />
        <Route path=':articleID' component={ AdminArticle } />
      </Route>
      <Route path='article_images' component={ AdminArticleImages } />
      <Route path='pages'>
        <IndexRoute component={ AdminPages } />
        <Route path=':slug/edit' component={ AdminEditPage } />
        <Route path=':slug' component={ AdminPage } />
      </Route>
      <Route path='sign-in' component={ AdminSignIn } />
    </Route>
    <IndexRedirect to='home' />
    <Route path='not-found' component={ NotFound } />
    <Route path=':slug' component={ ShowPage } />
    <Route path='*' component={ NotFound } />
  </Route>
)