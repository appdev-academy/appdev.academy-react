import React from 'react'
import { Link } from 'react-router'

import ErrorsList from '../ErrorsList'
import BlueButton from '../Buttons/Blue'
import GreenButton from '../Buttons/Green'

export default class Form extends React.Component {
  // Set Tag
  setTag(tag) {
    if (tag) {
      this.refs.title.value = tag.title
      this.refs.slug.value = tag.slug
    }
  }
  
  handleSubmit(event) {
    event.preventDefault()
    let tagParams = {
      title: this.refs.title.value
    }
    this.props.handleSubmit(tagParams)
  }
  
  render () {
    return (
      <div className='column'>
        <ErrorsList errors={ this.props.errors } />
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' ref='title' id='title' autoFocus={ true } />
        </div>
        <div className='form-group'>
          <label htmlFor='slug'>Slug</label>
          <input type='text' ref='slug' id='slug' disabled />
        </div>
        <div className='actions center'>
          <GreenButton
            title='Save'
            onClick={ this.handleSubmit.bind(this) }
          />
          <Link className='button blue' to={ `/tags` }>Back to Tags</Link>
        </div>
      </div>
    )
  }
}
