import React from 'react'
import { Link } from 'react-router'
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
      <div className='full-width'>
        <h2 className='center'>{ article.title }</h2>
        <div className='article-container' dangerouslySetInnerHTML={{ __html: article.html_content }} />
        <div className='actions center'>
          <Link to={ `/articles/${article.id}/edit` } className='button orange'>Edit</Link>
          <Link to={ '/articles/' } className='button blue'>Back to Articles</Link>
        </div>
      </div>
    )
  }
}
