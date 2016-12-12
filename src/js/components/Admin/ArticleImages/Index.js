import React from 'react'
import { inject, observer } from 'mobx-react'

import Row from './Row'
import GreenButton from '../../Buttons/Green'

@inject('articleImagesStore')
@observer
export default class Index extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      file: ''
    }
  }
  
  componentDidMount() {
    this.props.articleImagesStore.fetchIndex()
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
    data.append('article_image[image]', this.state.file)
    
    this.props.articleImagesStore.create(data).then((response) => {
      this.setState({
        image: '',
        file: ''
      })
      this.props.articleImagesStore.fetchIndex()
    })
  }
  
  renderImages(images) {
    return images.map((image, index) => {
      return <Row key={ index } image={ image } />
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
            { this.renderImages(this.props.articleImagesStore.images) }
          </tbody>
        </table>
      </div>
    )
  }
}