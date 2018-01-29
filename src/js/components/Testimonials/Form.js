import React from 'react'
import { Link } from 'react-router'

import ClassNames from 'classnames'
import MarkdownIt from 'markdown-it'
import Textarea from 'react-textarea-autosize'

import videoPlugin from '../../plugins/video'
import ErrorsList from '../ErrorsList'
import BlueButton from '../Buttons/Blue'
import GreenButton from '../Buttons/Green'

// Setup MarkdownIt parser with videos plugin
let markdown = new MarkdownIt()
markdown.use(videoPlugin)

export default class Form extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      body: '',
      file: '',
      html_body: '',
      profilePicture: '',
      showType: 'editor'
    }
  }
  
  setTestimonial(testimonial) {
    if (testimonial) {
      this.refs.company.value = testimonial.company,
      this.refs.firstName.value = testimonial.first_name,
      this.refs.lastName.value = testimonial.last_name,
      this.refs.title.value = testimonial.title,
      this.setState({
        body: testimonial.body,
        htmlBody: markdown.render(testimonial.body),
        profilePicture: testimonial.profile_picture
      })
    }
  }
  
  
  bodyChanged(event) {
    // Get new Markdown text
    let newText = event.target.value
    // Update page
    this.setState({
      body: newText,
      htmlBody: markdown.render(newText)
    })
  }
  
  selectFile() {
    this.refs.profilePicture.click()
  }
  
  didSelectFile() {
    let file = this.refs.profilePicture.files[0]
    let reader = new FileReader()
    
    reader.onload = (event) => {
      this.setState({
        file: file,
        profilePicture: reader.result
      })
    }
    reader.readAsDataURL(file)
  }
  
  // Form submition
  handleSubmit(event) {
    event.preventDefault()
    let formData = new FormData()
    
    formData.append('testimonial[body]', this.state.body)
    formData.append('testimonial[company]', this.refs.company.value)
    formData.append('testimonial[first_name]', this.refs.firstName.value)
    formData.append('testimonial[html_body]', this.state.htmlBody)
    formData.append('testimonial[last_name]', this.refs.lastName.value)
    formData.append('testimonial[title]', this.refs.title.value)
    
    if (this.state.file) {
      formData.append('testimonial[profile_picture]', this.state.file)
    }
    
    this.props.handleSubmit(formData)
  }
  
  clickEditor() {
    this.setState({
      showType: 'editor'
    })
  }
  
  clickPreview() {
    this.setState({
      showType: 'preview'
    })
  }
  
  render () {
    let editorClasses = ClassNames({
      'hidden': this.state.showType == 'preview',
      'half-width': this.state.showType == 'editor'
    })
    
    let previewClasses = ClassNames({
      'testimonial-container': true,
      'full-width': this.state.showType == 'preview',
      'half-width': this.state.showType == 'editor'
    })
    
    return (
      <div className='column'>
        <ErrorsList errors={ this.props.errors } />
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' ref='title' id='title' autoFocus={ true } />
        </div>
        <div className='form-group'>
          <label htmlFor='company'>Company</label>
          <input type='text' ref='company' id='company' />
        </div>
        <div className='form-group'>
          <label htmlFor='firstName'>First name</label>
          <input type='text' ref='firstName' id='firstName' />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last name</label>
          <input type='text' ref='lastName' id='lastName' />
        </div>
        <div className='form-group testimonial-picture'>
          <label htmlFor='profilePicture'>Profile picture</label>
          <img src={ this.state.profilePicture } onClick={ this.selectFile.bind(this) } />
          <input
            name='profilePicture'
            id='profilePicture'
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={ this.didSelectFile.bind(this) }
            ref='profilePicture'
          />
        </div>
        <div className='buttons center'>
          <BlueButton
            title='Editor'
            selected={ this.state.showType == 'editor' }
            onClick={ this.clickEditor.bind(this) }
          />
          <BlueButton
            title='Preview'
            selected={ this.state.showType == 'preview' }
            onClick={ this.clickPreview.bind(this) }
          />
        </div>
        <div>
          <h2 className='center'>Body</h2>
          <div>
            <Textarea className={ editorClasses } value={ this.state.body } onChange={ this.bodyChanged.bind(this) } rows={ 5 }></Textarea>
            <div className={ previewClasses } dangerouslySetInnerHTML={{ __html: this.state.htmlBody }} />
          </div>
        </div>
        <div className='actions left'>
          <GreenButton
            title='Save'
            onClick={ this.handleSubmit.bind(this) }
          />
          <Link className='button blue' to={ `/testimonials` }>Back to Testimonials</Link>
        </div>
      </div>
    )
  }
}
