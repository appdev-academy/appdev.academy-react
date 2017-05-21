import React from 'react'
import { Link } from 'react-router'
import MarkdownIt from 'markdown-it'
import Textarea from 'react-textarea-autosize'
import ClassNames from 'classnames'

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
      preview: '',
      htmlPreview: '',
      content: '',
      htmlContent: '',
      showType: 'editor'
    }
  }
  
  setProject(project) {
    if (project) {
      this.refs.title.value = project.title
      this.setState({
        preview: project.preview,
        htmlPreview: markdown.render(project.preview),
        content: project.content,
        htmlContent: markdown.render(project.content)
      })
    }
  }
  
  previewChanged(event) {
    // Get new Markdown text
    let newText = event.target.value
    // Update page
    this.setState({
      preview: newText,
      htmlPreview: markdown.render(newText)
    })
  }
  
  contentChanged(event) {
    let newText = event.target.value
    this.setState({
      content: newText,
      htmlContent: markdown.render(newText)
    })
  }
  
  handleSubmit(event) {
    event.preventDefault()
    let projectParams = {
      title: this.refs.title.value,
      preview: this.state.preview,
      html_preview: this.state.htmlPreview,
      content: this.state.content,
      html_content: this.state.htmlContent
    }
    this.props.handleSubmit(projectParams)
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
      'project-container': true,
      'full-width': this.state.showType == 'preview',
      'half-width': this.state.showType == 'editor'
    })
    
    return (
      <div className='column'>
        <ErrorsList errors={ this.props.errors } />
        <div className='form-group'>
          <input type='text' ref='title' className='title' autoFocus={ true } />
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
          <h2 className='center'>Preview</h2>
          <Textarea className={ editorClasses } value={ this.state.preview } onChange={ this.previewChanged.bind(this) } rows={ 5 }></Textarea>
          <div className={ previewClasses } dangerouslySetInnerHTML={{ __html: this.state.htmlPreview }} />
        </div>
        <div>
          <h2 className='center'>Content</h2>
          <Textarea className={ editorClasses } value={ this.state.content } onChange={ this.contentChanged.bind(this) } rows={ 10 }></Textarea>
          <div className={ previewClasses } dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
        </div>
        <div className='actions center'>
          <GreenButton
            title='Save'
            onClick={ this.handleSubmit.bind(this) }
          />
          <Link className='button blue' to={ `/projects` }>Back to Projects</Link>
        </div>
      </div>
    )
  }
}
