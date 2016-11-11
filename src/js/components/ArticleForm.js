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
      text: [].join('\n')
    }
  }
  
  // Set new text
  onChange(event) {
    this.setState({
      text: event.target.value
    })
  }
  
  setArticle(article) {
    if (article) {
      this.refs.title.value = article.title
      this.state.text = article.body
    }
  }
  
  handleSubmit(event) {
    event.preventDefault()
    
    let articleParams = {
      title: this.refs.title.value,
      body: this.state.text,
      html_body: markdown.render(this.state.text)
    }
    this.props.handleSubmit(articleParams)
  }
  
  render () {
    return (
      <div>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref='title' />
        </div>
        <Editor text={ this.state.text } onChange={ this.onChange.bind(this) } />
        <Preview text={ this.state.text } />
        <button onClick={ this.handleSubmit.bind(this) }>Submit</button>
      </div>
    )
  }
}