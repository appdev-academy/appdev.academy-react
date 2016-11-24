import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('articleImagesStore')
@observer
export default class ArticleImages extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      image: ''
    }
  }
  
  componentDidMount() {
    this.props.articleImagesStore.loadArticleImages()
  }
  
  handleSubmit() {
    let file = this.refs.fileUpload.files[0]
    var reader = new FileReader()
    reader.onload = (event) => {
      this.setState({
        image: event.target.result
      })
    }
    reader.readAsDataURL(file)
    let data = new FormData()
    data.append('article_image[image]', file)
    
    this.props.articleImagesStore.uploadArticleImage(data).then((response) => {
      this.props.articleImagesStore.loadArticleImages()
      console.log(response.data)
    })
  }
  
  render() {
    return (
      <div>
        <h2>Article Images</h2>
        <div className='form-group'>
          <label htmlFor='file'>File</label>
          <img src={ this.state.image } />
          <input type='file' ref='fileUpload' />
        </div>
        <button type='button' onClick={ this.handleSubmit.bind(this) }>Upload</button>
        { this.props.articleImagesStore.images.map((image, index) => {
            return <p key={ index }>Thumb{ image.id } { image.thumb }</p>
        })}
      </div>
    )
  }
}