import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { browserHistory } from 'react-router'

import ArticleForm from './ArticleForm'

@inject('appState')
export default class NewArticle extends Component {

  handleSubmit(articleParams) {
    this.props.appState.createArticle(articleParams).then((response) => {
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
