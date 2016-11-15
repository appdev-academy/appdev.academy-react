import React from 'react'
import ArticleForm from './ArticleForm'

import { browserHistory } from 'react-router'

import { fetchArticle, updateArticle } from '../actions/articles'

export default class EditArticle extends React.Component {
  
  componentDidMount() {
    let articleID = this.props.params.articleID
    let articleForm = this.refs.articleForm
    fetchArticle(articleID).then((response) => {
      if (response.status == 200) {
        articleForm.setArticle(response.data)
      }
    })
  }
  
  handleSubmit(articleParams) {
    updateArticle(articleParams, this.props.params.articleID).then((response) => {
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