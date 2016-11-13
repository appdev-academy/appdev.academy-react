import React from 'react'

import ArticleForm from './ArticleForm'

export default class NewArticle extends React.Component {
  
  handleSubmit(articleParams) {
    let dispatch = this.props.dispatch
    this.props.createArticle(dispatch, articleParams)
  }
  
  render() {
    return (
      <ArticleForm handleSubmit={ this.handleSubmit.bind(this) } />
    )
  }
}