import React, { Component } from 'react'
import { inject } from 'mobx-react'
import ArticleForm from './ArticleForm'

import { browserHistory } from 'react-router'

@inject('appState')
export default class EditArticle extends React.Component {
  
  componentDidMount() {
    let articleID = this.props.params.articleID
    let articleForm = this.refs.articleForm
    this.props.appState.fetchArticle(articleID).then((response) => {
      if (response.status == 200) {
        articleForm.setArticle(response.data)
      }
    })
  }
  
  handleSubmit(articleParams) {
    this.props.appState.updateArticle(articleParams, this.props.params.articleID).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/admin/articles')
      }
    })
  }
  
  render() {
    return (
      <ArticleForm handleSubmit={ this.handleSubmit.bind(this) } ref='articleForm' />
    )
  }
}