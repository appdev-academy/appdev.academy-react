import React from 'react'
import { Link } from 'react-router'

import ClassNames from 'classnames'
import MarkdownIt from 'markdown-it'
import Textarea from 'react-textarea-autosize'
import { WithContext as ReactTags } from 'react-tag-input'

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
      showType: 'editor',
      tags: []
    }
  }
  
  componentDidMount() {
    this.props.tagsStore.fetchIndex()
  }
  
  setArticle(article) {
    if (article) {
      this.refs.title.value = article.title
      this.refs.shortDescription.value = article.short_description
      this.refs.imageURL.value = article.image_url
      this.setState({
        preview: article.preview,
        htmlPreview: markdown.render(article.preview),
        content: article.content,
        htmlContent: markdown.render(article.content),
        tags: article.tags
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
  
  // Tags management
  addTag(tag) {
    let tags = this.state.tags
    let tagID = Math.floor(100000 * Math.random())
    tags.push({
      id: tagID,
      title: tag
    });
    this.setState({tags: tags});
  }
  
  deleteTag(index) {
    let tags = this.state.tags;
    tags.splice(index, 1);
    this.setState({tags: tags});
  }
  
  dragTag(tag, currentPosition, newPosition) {
    let tags = this.state.tags;
    tags.splice(currentPosition, 1);
    tags.splice(newPosition, 0, tag);
    this.setState({ tags: tags });
  }
  
  // Form submition
  handleSubmit(event) {
    event.preventDefault()
    let articleParams = {
      title: this.refs.title.value,
      short_description: this.refs.shortDescription.value,
      image_url: this.refs.imageURL.value,
      preview: this.state.preview,
      html_preview: this.state.htmlPreview,
      content: this.state.content,
      html_content: this.state.htmlContent,
      tags_titles: this.state.tags.map(tag => tag.title).join(',')
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
    
    let suggestions = this.props.allTags.map(tag => tag.title)
    
    return (
      <div className='column'>
        <ErrorsList errors={ this.props.errors } />
        <div className='form-group'>
          <input type='text' ref='title' className='title' autoFocus={ true } />
        </div>
        <div className='form-group'>
          <label htmlFor='shortDescription'>Short description (for SEO and sharing to social networks)</label>
          <input type='text' id='shortDescription' ref='shortDescription' />
        </div>
        <div className='form-group'>
          <label htmlFor='imageURL'>Image URL</label>
          <input type='text' id='imageURL' ref='imageURL' />
        </div>
        <div className='form-group'>
          <label htmlFor='tags'>Tags</label>
          <ReactTags
            labelField='title'
            autofocus={ false }
            tags={ this.state.tags }
            suggestions={ suggestions }
            handleDelete={ this.deleteTag.bind(this) }
            handleAddition={ this.addTag.bind(this) }
            handleDrag={ this.dragTag.bind(this) }
          />
        </div>
        <div className='actions left'>
          <GreenButton
            title='Save'
            onClick={ this.handleSubmit.bind(this) }
          />
          <Link className='button blue' to={ `/articles` }>Back to Articles</Link>
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
          <div>
            <Textarea className={ editorClasses } value={ this.state.preview } onChange={ this.previewChanged.bind(this) } rows={ 5 }></Textarea>
            <div className={ previewClasses } dangerouslySetInnerHTML={{ __html: this.state.htmlPreview }} />
          </div>
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
          <h2 className='center'>Content</h2>
          <div>
            <Textarea className={ editorClasses } value={ this.state.content } onChange={ this.contentChanged.bind(this) } rows={ 10 }></Textarea>
            <div className={ previewClasses } dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
          </div>
        </div>
        <div className='actions left'>
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
