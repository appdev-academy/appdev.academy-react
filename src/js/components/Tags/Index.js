import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import TableBody from './TableBody'
import ConfirmationDialog from '../ConfirmationDialog'

@inject('tagsStore')
@observer
export default class Index extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    }
  }
  
  componentDidMount() {
    this.props.tagsStore.fetchIndex()
  }
  
  showDeleteConfirmationDialog(entity) {
    this.setState({
      deleteConfirmationDialogShow: true,
      deleteConfirmationDialogEntityID: entity.id,
      deleteConfirmationDialogEntityTitle: entity.title
    })
  }
  
  hideDeleteConfirmationDialog() {
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    })
  }
  
  deleteButtonClick() {
    this.props.tagsStore.delete(this.state.deleteConfirmationDialogEntityID);
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    })
  }
  
  render() {
    return (
      <div className='tags'>
        <h2 className='center'>Tags</h2>
        <Link className='button blue' to='/tags/new'>+ New Tag</Link>
        <br />
        <br />
        <table className='admin'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Slug</td>
              <td>Actions</td>
            </tr>
          </thead>
          <TableBody
            tags={ this.props.tagsStore.tags }
            deleteButtonClick={ (tag) => { this.showDeleteConfirmationDialog(tag) }}
          />
        </table>
        <ConfirmationDialog
          actionButtonClick={ () => { this.deleteButtonClick() }}
          actionName='delete'
          cancelButtonClick= { () => { this.hideDeleteConfirmationDialog() }}
          destructive={ true }
          entityName='tag'
          entityTitle={ this.state.deleteConfirmationDialogEntityTitle }
          show={ this.state.deleteConfirmationDialogShow }
        />
      </div>
    )
  }
}
