import React from 'react'
import MarkdownIt from 'markdown-it'
import Textarea from 'react-textarea-autosize'

import videoPlugin from '../../plugins/video'

// Setup MarkdownIt parser with videos plugin
let markdown = new MarkdownIt()
markdown.use(videoPlugin)

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      htmlDocument: '',
      showType: 'both'
    }
  }
  
  // Set new text
  onChange(event) {
    let newText = event.target.value
    this.setState({
      text: newText,
      htmlDocument: markdown.render(newText)
    })
  }
  
  setArticle(article) {
    if (article) {
      this.refs.title.value = article.title
      this.setState({
        text: article.content,
        htmlDocument: markdown.render(article.content)
      })
    }
  }
  
  handleSubmit(event) {
    event.preventDefault()
    
    let articleParams = {
      title: this.refs.title.value,
      content: this.state.text,
      html_content: this.state.htmlDocument
    }
    this.props.handleSubmit(articleParams)
  }
  
  clickMarkdown() {
    this.setState({
      showType: 'markdown'
    })
  }
  
  clickPreview() {
    this.setState({
      showType: 'preview'
    })
  }
  
  clickBoth() {
    this.setState({
      showType: 'both'
    })
  }
  
  render () {
    let editorShow = 'showHalfScreen'
    let previewShow = 'showHalfScreen'
    if (this.state.showType == 'markdown') {
      editorShow = 'showFullScreen'
      previewShow = 'hidden'
    } else if (this.state.showType == 'preview') {
      editorShow = 'hidden'
      previewShow = 'showFullScreen'
    }
    
    return (
      <div>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref='title' />
        </div>
        <div className='center'>
          <a onClick={ this.clickMarkdown.bind(this) }>Markdown</a> /
          <a onClick={ this.clickPreview.bind(this) }> Preview</a> /
          <a onClick={ this.clickBoth.bind(this) }> Both</a>
        </div>
        <Textarea className={ editorShow } value={ this.state.text } onChange={ this.onChange.bind(this) } rows={ 3 }></Textarea>
        <div className={ previewShow } dangerouslySetInnerHTML={{ __html: this.state.htmlDocument }} />
        <button onClick={ this.handleSubmit.bind(this) }>Submit</button>
      </div>
    )
  }
}