import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('pagesStore')
@observer
export default class Edit extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  componentDidMount() {
    // Make sure Page is among allowed ones
    let slug = this.props.params.slug
    if (!this.props.pagesStore.allowedPages.includes(slug)) {
      browserHistory.push('/pages')
    }
    // Fetch Page to edit
    this.props.pagesStore.fetchShow(slug).then((response) => {
      if (response.status == 200) {
        this.refs.pageForm.setPage(response.data)
      }
    })
  }
  
  handleSubmit(params) {
    let slug = this.props.params.slug
    this.props.pagesStore.update(slug, params).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/pages')
      }
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        this.setState({
          errors: error.response.data.errors
        })
      }
    })
  }
  
  render() {
    return (
      <Form
        errors={ this.state.errors }
        handleSubmit={ this.handleSubmit.bind(this) }
        ref='pageForm'
      />
    )
  }
}
