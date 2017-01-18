import React from 'react'
import { Link } from 'react-router'

import BlueButton from '../Buttons/Blue'
import GreenButton from '../Buttons/Green'

export default class Form extends React.Component {
  // Set Topic
  setTopic(topic) {
    if (topic) {
      this.refs.title.value = topic.title
      this.refs.slug.value = topic.slug
    }
  }
  
  handleSubmit(event) {
    event.preventDefault()
    let topicParams = {
      title: this.refs.title.value,
      slug: this.refs.slug.value
    }
    this.props.handleSubmit(topicParams)
  }
  
  render () {
    return (
      <div>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' ref='title' id='title' autoFocus={ true } />
        </div>
        <div className='form-group'>
          <label htmlFor='slug'>Slug</label>
          <input type='text' ref='slug' id='slug' />
        </div>
        <div className='actions center'>
          <GreenButton
            title='Save'
            onClick={ this.handleSubmit.bind(this) }
          />
          <Link className='button blue' to={ `/topics` }>Back to Topics</Link>
        </div>
      </div>
    )
  }
}
