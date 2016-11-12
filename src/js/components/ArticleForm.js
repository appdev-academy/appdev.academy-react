import React from 'react'
import MarkdownIt from 'markdown-it'

import Editor from './Redactor/Editor'
import Preview from './Redactor/Preview'

import videoPlugin from './Redactor/video'

// Setup MarkdownIt parser with videos plugin
let markdown = new MarkdownIt()
markdown.use(videoPlugin)

export default class ArticleForm extends React.Component {
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
        text: article.body,
        htmlDocument: markdown.render(article.body)
      })
    }
  }
  
  handleSubmit(event) {
    event.preventDefault()
    
    let articleParams = {
      title: this.refs.title.value,
      body: this.state.text,
      html_body: this.state.htmlDocument
    }
    this.props.handleSubmit(articleParams)
  }
  
  clickMarkdown() {
    console.log('clickMarkdown');
    this.setState({
      showType: 'markdown'
    })
  }
  
  clickPreview() {
    console.log('clickPreview');
    this.setState({
      showType: 'preview'
    })
  }
  
  clickBoth() {
    console.log('clickBoth');
    this.setState({
      showType: 'both'
    })
  }
  
  render () {
    var editorShow = ''
    var previewShow = ''
    if (this.state.showType == 'both') {
      editorShow = 'showHalfScreen'
      previewShow = 'showHalfScreen'
    } else if (this.state.showType == 'markdown') {
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
        <Editor text={ this.state.text } onChange={ this.onChange.bind(this) } showType={ editorShow }/>
        <Preview htmlDocument={ this.state.htmlDocument } showType={ previewShow }/>
        <button onClick={ this.handleSubmit.bind(this) }>Submit</button>
      </div>
    )
  }
}