import React from 'react'
import { Link } from 'react-router'

export default class Articles extends React.Component {

  componentDidMount() {
    // Fetch list of articles
    let dispatch = this.props.dispatch
    this.props.fetchArticles(dispatch)
  }

  deleteButtonClick(articleID) {
    let dispatch = this.props.dispatch
    this.props.deleteArticle(dispatch, articleID)
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
            <button className='delete' onClick={ this.deleteButtonClick.bind(this, article.id) } >Delete</button>
          </td>
        </tr>
      )
    })
  }

  render() {
    let { articles, loading, error } = this.props.articlesList

    if (loading) {
      return <div className="container"><h1>Articles</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

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
            { this.renderArticles(articles) }
          </tbody>
        </table>
        <a href="/admin/articles/new">Create new</a>
      </div>
    )
  }
}