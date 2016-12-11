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
      page: {
        slug: 'Lo',
        content: '',
        htmlContent: ''
      },
      showType: 'editor'
    }
  }
  
  contentChanged(event) {
    // Get new Markdown text
    let newText = event.target.value
    // Update page
    let page = this.state.page
    page.content = newText
    page.htmlContent = markdown.render(newText)
    // Set new state
    this.setState({
      page: page
    })
  }
  
  setPage(page) {
    console.log('Set Page');
    if (page) {
      this.setState({
        page: page
      })
    }
  }
  
  handleSubmit(event) {
    event.preventDefault()
    let pageParams = {
      content: this.state.page.content,
      html_content: this.state.page.htmlContent
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
    
    let slug = this.state.page.slug
    let capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1)
    
    return (
      <div>
        <h1 className='center'>Edit { capitalizedSlug }</h1>
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
          <Textarea className={ editorClasses } value={ this.state.page.content } onChange={ this.contentChanged.bind(this) } rows={ 10 }></Textarea>
          <div className={ previewClasses } dangerouslySetInnerHTML={{ __html: this.state.page.htmlContent }} />
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