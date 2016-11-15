import React from 'react'

import ArticleForm from './ArticleForm'

import { browserHistory } from 'react-router'

import { createArticle } from '../actions/articles'

export default class NewArticle extends React.Component {
  
  handleSubmit(articleParams) {
    createArticle(articleParams).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/admin/articles')
      }
    })
  }
  
  render() {
    return (
      <ArticleForm handleSubmit={ this.handleSubmit.bind(this) } />
    )
  }
}