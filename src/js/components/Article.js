import React from 'react'

import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Preview from './Redactor/Preview'

import { fetchArticle } from '../actions/articles'

let appState = observable({
  article: {}
})

@observer export default class Article extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    let articleID = this.props.params.articleID
    fetchArticle(articleID).then(function (response) {
      appState.article = response.data
    })
  }
  
  render() {
    return (
      <div>
        <h3>{ appState.article.id }</h3>
        <h3>{ appState.article.title }</h3>
        <Preview htmlDocument={ appState.article.html_body } showType={ 'showFullScreen' } />
      </div>
    )
  }
}