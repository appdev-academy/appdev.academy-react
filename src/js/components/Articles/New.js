import React from 'react'
import { browserHistory } from 'react-router'
import { inject } from 'mobx-react'

import ArticleForm from './Form'

@inject('articlesStore')
export default class NewArticle extends React.Component {
  
  handleSubmit(articleParams) {
    this.props.articlesStore.createArticle(articleParams).then((response) => {
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