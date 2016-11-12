import React from 'react'
import MarkdownIt from 'markdown-it'

import Preview from './Redactor/Preview'

import videoPlugin from './Redactor/video'

// Setup MarkdownIt parser with videos plugin
let markdown = new MarkdownIt()
markdown.use(videoPlugin)

export default class Article extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    let dispatch = this.props.dispatch
    let articleID = this.props.params.articleID
    this.props.fetchArticle(dispatch, articleID)
  }
  
  render() {
    let { article, loading, error } = this.props.activeArticle
    
    if (loading) {
      return <div className='container'>Loading...</div>
    } else if (error) {
      return  <div className='alert alert-danger'>{error.message}</div>
    } else if (!article) {
      return <span />
    }
    
    return (
      <div>
        <h3>{ article.id }</h3>
        <h3>{ article.title }</h3>
        <Preview htmlDocument={ markdown.render(article.body) } showType={ 'showFullScreen' } />
      </div>
    )
  }
}