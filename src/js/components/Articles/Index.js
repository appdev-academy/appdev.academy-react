import React from 'react'
import { Link, browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import DeleteButton from '../Buttons/Red'

@inject('articlesStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.articlesStore.fetchIndex()
  }
  
  deleteButtonClick(articleID) {
    this.props.articlesStore.delete(articleID)
  }
  
  // Render list of Articles
  renderArticles(articles) {
    return articles.map((article) => {
      return (
        <tr key={ article.id }>
          <td>{ article.title }</td>
          <td className='actions left'>
            <Link className='button blue' to={ `/admin/articles/${article.id}` }>Show</Link>
            <Link className='button green' to={ `/admin/articles/${article.id}/edit` }>Edit</Link>
            <DeleteButton
              title='Delete'
              onClick={ this.deleteButtonClick.bind(this, article.id)}
            />
          </td>
        </tr>
      )
    })
  }
  
  render() {
    return (
      <div className='articles'>
        <h2 className='center'>Articles</h2>
        <table className='articles'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Next awesome Article...</td>
              <td>
                <Link className='button blue' to='/admin/articles/new'>+ New Article</Link>
              </td>
            </tr>
            { this.renderArticles(this.props.articlesStore.articles) }
          </tbody>
        </table>
      </div>
    )
  }
}