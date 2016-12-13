import React from 'react'
import { browserHistory, Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('articlesStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.articlesStore.fetchIndex()
  }
  
  renderArticles(articles) {
    return articles.map((article) => {
      return (
        <li className='article-container' key={ article.id }>
          <Link className='article-title' to={ `/articles/${article.id}` }>{ article.title }</Link>
          <div dangerouslySetInnerHTML={{ __html: article.html_preview }} />
        </li>
      )
    })
  }
  
  render() {
    let articles = this.props.articlesStore.articles.filter((article) => {
      return article.published_at && !article.is_hidden
    })
    
    return (
      <div className='full-width'>
        <h2 className='center'>Articles</h2>
        <ol className='list-of-articles'>
          { this.renderArticles(articles) }
        </ol>
      </div>
    )
  }
}