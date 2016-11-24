import React from 'react'
import { inject, observer } from 'mobx-react'

import ArticleImageRow from './Row'

@inject('articleImagesStore')
@observer
export default class ArticleImages extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      file: ''
    }
  }
  
  componentDidMount() {
    this.props.articleImagesStore.loadArticleImages()
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
    
    this.props.articleImagesStore.uploadArticleImage(data).then((response) => {
      this.setState({
        image: '',
        file: ''
      })
      this.props.articleImagesStore.loadArticleImages()
    })
  }
  
  renderImages(images) {
    return images.map((image, index) => {
      return <ArticleImageRow key={ index } image={ image } />
    })
  }
  
  render() {
    return (
      <div>
        <h2 className='center'>Article Images</h2>
        <table className='article-images'>
          <thead>
            <tr>
              <td>Preview</td>
              <td>Thumb URL</td>
              <td>Regular URL</td>
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
              <td></td>
              <td>
                <button type='button' onClick={ this.uploadSelectedFile.bind(this) }>Upload</button>
              </td>
            </tr>
            { this.renderImages(this.props.articleImagesStore.images) }
          </tbody>
        </table>
      </div>
    )
  }
}