import React from 'react'
import { inject, observer } from 'mobx-react'

import Preview from '../Redactor/Preview'

@inject('articlesStore')
@observer
export default class Show extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    let articleID = this.props.params.articleID
    this.props.articlesStore.fetchArticle(articleID).then(response => {
      if (response.status == 200) {
        this.props.articlesStore.article = response.data
      }
    })
  }
  
  render() {
    let article = this.props.articlesStore.article
    return (
      <div>
        <h3>{ article.id }</h3>
        <h3>{ article.title }</h3>
        <Preview htmlDocument={ article.html_content } showType={ 'showFullScreen' } />
      </div>
    )
  }
}