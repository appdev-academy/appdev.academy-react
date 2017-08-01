import React from 'react'
import { inject, observer } from 'mobx-react'

import ConfirmationDialog from '../ConfirmationDialog'
import GreenButton from '../Buttons/Green'
import Row from './Row'

@observer
export default class Index extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      file: '',
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null
    }
  }
  
  componentDidMount() {
    this.props.galleryImagesStore.fetchIndex(this.props.projectID)
  }
  
  selectFile() {
    this.refs.fileUpload.click()
  }
  
  didSelectFile() {
    let file = this.refs.fileUpload.files[0]
    let reader = new FileReader()
    reader.onload = (event) => {
      this.setState({
        image: event.target.result,
        file: file
      })
    }
    reader.readAsDataURL(file)
  }
  
  uploadSelectedFile() {
    if (this.state.file == '') {
      return
    }
    
    let data = new FormData()
    data.append('gallery_image[image]', this.state.file)
    
    let projectID = this.props.projectID
    
    this.props.galleryImagesStore.create(projectID, data).then((response) => {
      this.setState({
        image: '',
        file: ''
      })
      this.props.galleryImagesStore.fetchIndex(projectID)
    })
  }
  
  showDeleteConfirmationDialog(entityID) {
    this.setState({
      deleteConfirmationDialogShow: true,
      deleteConfirmationDialogEntityID: entityID
    })
  }
  
  hideDeleteConfirmationDialog() {
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null
    })
  }
  
  deleteButtonClick() {
    let projectID = this.props.projectID
    let galleryImageID = this.state.deleteConfirmationDialogEntityID
    this.props.galleryImagesStore.delete(projectID, galleryImageID);
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null
    })
  }
  
  renderImages(images) {
    return images.map((image, index) => {
      return (
        <Row
          key={ index }
          image={ image }
          deleteButtonClick={ (entityID) => { this.showDeleteConfirmationDialog(entityID) }}
        />
      )
    })
  }
  
  render() {
    return (
      <div>
        <h2 className='center'>Article Images</h2>
        <table className='admin'>
          <thead>
            <tr>
              <td>Preview</td>
              <td>Image URL</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr className='new-article-image'>
              <td>
                <img src={ this.state.image } onClick={ this.selectFile.bind(this) } />
                <input
                  className='hidden'
                  name='image'
                  type='file'
                  accept='image/png, image/jpeg, image/jpg'
                  onChange={ this.didSelectFile.bind(this) }
                  ref='fileUpload'
                />
              </td>
              <td></td>
              <td>
                <GreenButton
                  title='Upload'
                  onClick={ this.uploadSelectedFile.bind(this) }
                />
              </td>
            </tr>
            { this.renderImages(this.props.galleryImagesStore.images) }
          </tbody>
        </table>
        <ConfirmationDialog
          actionName='delete'
          entityName='image'
          show={ this.state.deleteConfirmationDialogShow }
          destructive={ true }
          actionButtonClick={ () => { this.deleteButtonClick() }}
          cancelButtonClick= { () => { this.hideDeleteConfirmationDialog() }}
        />
      </div>
    )
  }
}
