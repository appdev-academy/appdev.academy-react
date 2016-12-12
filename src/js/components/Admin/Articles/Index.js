import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import RedButton from '../../Buttons/Red'
import GreenButton from '../../Buttons/Green'
import OrangeButton from '../../Buttons/Orange'

@inject('articlesStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.articlesStore.fetchIndex()
  }
  
  deleteButtonClick(articleID) {
    this.props.articlesStore.delete(articleID)
  }
  
  publishButtonClick(articleID) {
    this.props.articlesStore.publish(articleID)
  }
  
  hideButtonClick(articleID) {
    this.props.articlesStore.hide(articleID)
  }
  
  // Render list of Articles
  renderArticles(articles) {
    return articles.map((article) => {
      let publishButton = <GreenButton title='Publish' onClick={ this.publishButtonClick.bind(this, article.id)} />
      if (article.published_at && !article.is_hidden) {
        publishButton = <OrangeButton title='Hide' onClick={ this.hideButtonClick.bind(this, article.id)} />
      }
      
      return (
        <tr key={ article.id }>
          <td>{ article.title }</td>
          <td className='actions left'>
            <Link className='button blue' to={ `/admin/articles/${article.id}` }>Show</Link>
            <Link className='button green' to={ `/admin/articles/${article.id}/edit` }>Edit</Link>
            <RedButton
              title='Delete'
              onClick={ this.deleteButtonClick.bind(this, article.id)}
            />
          </td>
          <td className='actions left'>
            { publishButton }
          </td>
        </tr>
      )
    })
  }
  
  render() {
    return (
      <div className='articles'>
        <h2 className='center'>Articles</h2>
        <table className='admin'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Actions</td>
              <td>Publish</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Next awesome Article...</td>
              <td colSpan={ 2 }>
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