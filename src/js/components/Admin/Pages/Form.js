import React from 'react'
import { Link } from 'react-router'
import MarkdownIt from 'markdown-it'
import Textarea from 'react-textarea-autosize'
import ClassNames from 'classnames'

import videoPlugin from '../../../plugins/video'
import GreenButton from '../../Buttons/Green'
import OrangeButton from '../../Buttons/Orange'

// Setup MarkdownIt parser with videos plugin
let markdown = new MarkdownIt()
markdown.use(videoPlugin)

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: '',
      content: '',
      htmlContent: '',
      showType: 'editor'
    }
  }
  
  setPage(page) {
    if (!page || page === {}) {
      return
    }
    this.setState({
      slug: page.slug,
      content: page.content,
      htmlContent: page.html_content
    })
  }
  
  contentChanged(event) {
    // Get new Markdown text
    let newText = event.target.value
    // Update page
    this.setState({
      content: newText,
      htmlContent: markdown.render(newText)
    })
  }
  
  handleSubmit(event) {
    event.preventDefault()
    let pageParams = {
      content: this.state.content,
      html_content: this.state.htmlContent
    }
    this.props.handleSubmit(pageParams)
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
    
    let slug = this.state.slug
    let capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1)
    
    return (
      <div>
        <h2 className='center'>Edit { capitalizedSlug } page</h2>
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
          <Textarea className={ editorClasses } value={ this.state.content } onChange={ this.contentChanged.bind(this) } rows={ 10 }></Textarea>
          <div className={ previewClasses } dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
        </div>
        <div className='actions center'>
          <GreenButton
            title='Save'
            onClick={ this.handleSubmit.bind(this) }
          />
          <Link className='button blue' to={ `/admin/pages` }>Back to Pages</Link>
        </div>
      </div>
    )
  }
}