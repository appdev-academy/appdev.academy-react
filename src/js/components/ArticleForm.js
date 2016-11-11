import React from 'react'
import MarkdownIt from 'markdown-it'
import classNames from 'classnames'

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
      showMarkdown: true,
      showPreview: true
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
      showMarkdown: true,
      showPreview: false
    })
  }
  
  clickPreview() {
    console.log('clickPreview');
    this.setState({
      showMarkdown: false,
      showPreview: true
    })
  }
  
  clickBoth() {
    console.log('clickBoth');
    this.setState({
      showMarkdown: true,
      showPreview: true
    })
  }
  
  render () {
    var markdownClass = classNames({
      'editor': true,
      'showMarkdown' : !this.state.showMarkdown
    })
    
    var previewClass = classNames({
      'preview': true,
      'showPreview' : !this.state.showPreview
    })
    
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
        //add classes...
        <Editor text={ this.state.text } onChange={ this.onChange.bind(this) } />
        <Preview htmlDocument={ this.state.htmlDocument } />
        <button onClick={ this.handleSubmit.bind(this) }>Submit</button>
      </div>
    )
  }
}