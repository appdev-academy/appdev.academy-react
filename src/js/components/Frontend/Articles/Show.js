import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('articlesStore')
@observer
export default class Show extends React.Component {
  
  componentDidMount() {
    let articleID = this.props.params.articleID
    this.props.articlesStore.fetchShow(articleID).then(response => {
      if (response.status == 200) {
        this.props.articlesStore.article = response.data
      }
    })
  }
  
  render() {
    let article = this.props.articlesStore.article
    return (
      <div className='article-container'>
        <h2 className='center'>{ article.title }</h2>
        <div dangerouslySetInnerHTML={{ __html: article.html_content }} />
      </div>
    )
  }
}