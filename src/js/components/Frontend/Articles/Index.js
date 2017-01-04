import React from 'react'
import Helmet from 'react-helmet'
import { browserHistory, Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('articlesStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.articlesStore.fetchIndex()
  }
  
  slugify(text) {
    return text.toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text
  }
  
  renderArticles(articles) {
    return articles.map((article) => {
      let slug = this.slugify(article.title)
      return (
        <li className='article-container' key={ article.id }>
          <Link className='article-title' to={ `/articles/${article.id}-${slug}` }>{ article.title }</Link>
          <div dangerouslySetInnerHTML={{ __html: article.html_preview }} />
          <Link className='button blue' to={ `/articles/${article.id}-${slug}` }>Read more...</Link>
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
      <Helmet title='App Dev Academy | Blog' />
        <h2 className='center'>Articles</h2>
        <ol className='list-of-articles'>
          { this.renderArticles(articles) }
        </ol>
      </div>
    )
  }
}