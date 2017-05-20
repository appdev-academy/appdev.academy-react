import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import TableBody from './TableBody'
import ConfirmationDialog from '../ConfirmationDialog'

@inject('articlesStore')
@observer
export default class Index extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogArticleID: null
    }
  }
  
  componentDidMount() {
    this.props.articlesStore.fetchIndex()
  }
  
  moveArticle(startIndex, dropIndex) {
    if (startIndex == dropIndex) {
      return
    }
    
    let articleIDs = this.props.articlesStore.articles.map((article) => article.id)
    let draggedArticleID = articleIDs[startIndex]
    articleIDs.splice(startIndex, 1)
    articleIDs.splice(dropIndex, 0, draggedArticleID)
    // Sort Articles on server (assign position property to each Article according to order of IDs)
    this.props.articlesStore.sort(articleIDs)
  }
  
  showDeleteConfirmationDialog(articleID) {
    this.setState({
      deleteConfirmationDialogShow: true,
      deleteConfirmationDialogArticleID: articleID
    })
  }
  
  hideDeleteConfirmationDialog() {
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogArticleID: null
    })
  }
  
  deleteButtonClick() {
    this.props.articlesStore.delete(this.state.deleteConfirmationDialogArticleID);
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogArticleID: null
    })
  }
  
  render() {
    return (
      <div className='articles'>
        <h2 className='center'>Articles</h2>
        <Link className='button blue' to='/articles/new'>+ New Article</Link>
        <br />
        <br />
        <table className='admin'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Slug</td>
              <td>Position</td>
              <td>Actions</td>
              <td>Publish</td>
            </tr>
          </thead>
          <TableBody
            articles={ this.props.articlesStore.articles }
            publishButtonClick={ (articleID) => { this.props.articlesStore.publish(articleID) }}
            hideButtonClick={ (articleID) => { this.props.articlesStore.hide(articleID) }}
            deleteButtonClick={ (articleID) => { this.showDeleteConfirmationDialog(articleID) }}
            moveArticle={ this.moveArticle.bind(this) }
          />
        </table>
        <ConfirmationDialog
          text='Are you sure you want to delete this article?'
          show={ this.state.deleteConfirmationDialogShow }
          destructive={ true }
          okButtonClick={ () => { this.deleteButtonClick() }}
          cancelButtonClick= { () => { this.hideDeleteConfirmationDialog() }}
        />
      </div>
    )
  }
}
