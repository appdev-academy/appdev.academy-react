import React from 'react'
import { Link } from 'react-router'
import MarkdownIt from 'markdown-it'
import Textarea from 'react-textarea-autosize'
import ClassNames from 'classnames'

import videoPlugin from '../../plugins/video'
import GreenButton from '../Buttons/Green'
import OrangeButton from '../Buttons/Orange'

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
  
  setArticle(article) {
    if (article) {
      this.refs.title.value = article.title
      this.refs.imageURL.value = article.image_url
      this.setState({
        preview: article.preview,
        htmlPreview: markdown.render(article.preview),
        content: article.content,
        htmlContent: markdown.render(article.content)
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
    let articleParams = {
      title: this.refs.title.value,
      image_url: this.refs.imageURL.value,
      preview: this.state.preview,
      html_preview: this.state.htmlPreview,
      content: this.state.content,
      html_content: this.state.htmlContent
    }
    this.props.handleSubmit(articleParams)
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
      'article-container': true,
      'full-width': this.state.showType == 'preview',
      'half-width': this.state.showType == 'editor'
    })
    
    return (
      <div>
        <div className='form-group'>
          <input type='text' ref='title' className='title' autoFocus={ true } />
        </div>
        <div className='form-group'>
          <label htmlFor='imageURL'>Image URL</label>
          <input type='text' id='imageURL' ref='imageURL' />
        </div>
        <div className='buttons center'>
          <OrangeButton
            title='Editor'
            selected={ this.state.showType == 'editor' }
            onClick={ this.clickEditor.bind(this) }
          />
          <GreenButton
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
          <Link className='button blue' to={ `/articles` }>Back to Articles</Link>
        </div>
      </div>
    )
  }
}