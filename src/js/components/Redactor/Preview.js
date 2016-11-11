import React from 'react'
import MarkdownIt from 'markdown-it'

import videoPlugin from './video'

// Setup MarkdownIt parser with videos plugin
let markdown = new MarkdownIt()
markdown.use(videoPlugin)

export default class Preview extends React.Component {
  
  logHTML() {
    console.log(JSON.stringify(this.refs.content.innerHTML))
  }
  
  render() {
    let htmlDocument = markdown.render(this.props.text)
    
    return (
      <div className='preview'>
        <h4 className='center' onClick={ this.logHTML.bind(this) } >Preview</h4>
        <div className='content' dangerouslySetInnerHTML={{ __html: htmlDocument }} />
      </div>
    )
  }
}