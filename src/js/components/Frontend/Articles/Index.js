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
        <li key={ article.id }>
          <h3>
            <Link to={ `/articles/${article.id}` }>{ article.title }</Link>
          </h3>
        </li>
      )
    })
  }
  
  render() {
    let articles = this.props.articlesStore.articles.filter((article) => {
      return article.published_at && !article.is_hidden
    })
    
    return (
      <div className='articles-container full-width'>
        <h2 className='center'>Articles</h2>
        <ol>
          { this.renderArticles(articles) }
        </ol>
      </div>
    )
  }
}