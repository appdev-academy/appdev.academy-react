import React from 'react'

export default class ArticleForm extends React.Component {
  
  setArticle(article) {
    if (article) {
      this.refs.title.value = article.title
      this.refs.body.value = article.body
      this.refs.html_body.value = article.html_body
    }
  }
  
  handleSubmit(event) {
    event.preventDefault()
    
    let articleParams = {
      title: this.refs.title.value,
      body: this.refs.body.value,
      html_body: this.refs.html_body.value
    }
    this.props.handleSubmit(articleParams)
  }
  
  render () {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' ref='title' />
        </div>
        <div className='form-group'>
          <label htmlFor='body'>Body</label>
          <input type='text' id='body' ref='body' />
        </div>
        <div className='form-group'>
          <label htmlFor='html_body'>HTML Body</label>
          <input type='text' id='html_body' ref='html_body' />
        </div>
        <button onClick={ this.handleSubmit.bind(this) }>Submit</button>
      </form>
    )
  }
}