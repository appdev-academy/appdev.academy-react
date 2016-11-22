import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('appState')
@observer
export default class UploadPicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: ''
    }
  }
  
  handleSubmit() {
    var reader = new FileReader()
    let file = this.refs.fileUpload.files[0]
    reader.onload = (event) => {
      this.setState({
        image: event.target.result
      })
    }
    reader.readAsDataURL(file)
    let image = JSON.stringify({ 'image': this.state.image })
    let data = new FormData()
    data.append('article_image', image)
    this.props.appState.uploadPicture(data).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error.message)
    })
  }
  
  render() {
    return (
      <div>
        <h1>file upload</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='file'>File</label>
            <input type='file' ref='fileUpload' />
          </div>
          <button type='button' onClick={ this.handleSubmit.bind(this) }>Upload</button>
          <img src={ this.state.image } />
        </form>
      </div>
    )
  }
}