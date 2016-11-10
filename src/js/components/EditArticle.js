import React from 'react'
import ArticleForm from './ArticleForm'

export default class EditArticle extends React.Component {
  
  componentWillReceiveProps(nextProps) {
    let article = nextProps.activeArticle.article
    if (article) {
      this.refs.articleForm.setArticle(article)
    }
  }
  
  componentDidMount() {
    let dispatch = this.props.dispatch
    let articleID = this.props.params.articleID
    this.props.fetchArticle(dispatch, articleID)
  }
  
  handleSubmit(articleParams) {
    let dispatch = this.props.dispatch
    this.props.updateArticle(dispatch, articleParams, this.props.params.articleID)
  }
  
  render() {
    return (
      <ArticleForm handleSubmit={ this.handleSubmit.bind(this) } ref='articleForm' />
    )
  }
}