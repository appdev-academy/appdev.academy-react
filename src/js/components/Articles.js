import React from 'react'

import { observable } from 'mobx'
import { observer } from 'mobx-react'

import DevTools from 'mobx-react-devtools'

import { fetchArticles } from '../actions/articles'

let appState = observable({
  articles: []
})

@observer export default class Articles extends React.Component {

  constructor() {
    super()
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
        </tr>
      )
    })
  }

  render() {
    return (
      <div className='container'>
        <DevTools />
        <h1>Articles</h1>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
            </tr>
          </thead>
          <tbody>
            { this.renderArticles(appState.articles) }
          </tbody>
        </table>
      </div>
    )
  }
}