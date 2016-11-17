import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

import Preview from './Redactor/Preview'

@inject('appState')
@observer
export default class Article extends Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    let articleID = this.props.params.articleID
    this.props.appState.fetchArticle(articleID).then(response => {
      this.props.appState.article = response.data
    })
  }
  
  render() {
    let article = this.props.appState.article
    return (
      <div>
        <h3>{ article.id }</h3>
        <h3>{ article.title }</h3>
        <Preview htmlDocument={ article.html_body } showType={ 'showFullScreen' } />
      </div>
    )
  }
}