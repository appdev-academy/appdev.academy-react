import React from 'react'

import Preview from './Redactor/Preview'

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
        <Preview htmlDocument={ article.html_body } showType={ 'showFullScreen' } />
      </div>
    )
  }
}