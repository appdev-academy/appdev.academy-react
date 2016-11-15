import React from 'react'

import { Link, browserHistory } from 'react-router'

import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { fetchArticles, deleteArticle } from '../actions/articles'

let appState = observable({
  articles: []
})

@observer export default class Articles extends React.Component {
  
  componentDidMount() {
    fetchArticles().then(function (response) {
      appState.articles = response.data
    })
  }

  // Render list of Articles
  renderArticles(articles) {
    return articles.map((article) => {
      return (
        <tr key={ article.id }>
          <td>{ article.id }</td>
          <td>{ article.title }</td>
          <td>
            <Link to={ `/admin/articles/${article.id}` } >Show</Link>
            <Link to={ `/admin/articles/${article.id}/edit` } >Edit</Link>
            <button onClick={ this.deleteButtonClick.bind(this, article.id) } >Delete</button>
          </td>
        </tr>
      )
    })
  }

  deleteButtonClick(articleID) {
    deleteArticle(articleID).then((response) => {
      fetchArticles().then((response) => {
        appState.articles = response.data
      })
    })
  }

  render() {
    return (
      <div className='container'>
        <h1>Articles</h1>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            { this.renderArticles(appState.articles) }
          </tbody>
        </table>
        <a href="/admin/articles/new">Create new</a>
      </div>
    )
  }
}