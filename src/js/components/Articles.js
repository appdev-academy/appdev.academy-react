import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react';

@inject('appState')
@observer
export default class Articles extends Component {
  
  componentDidMount() {
    this.props.appState.loadArticles()
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
          </td>
        </tr>
      )
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
            { this.renderArticles(this.props.appState.articles) }
          </tbody>
        </table>
      </div>
    )
  }
}