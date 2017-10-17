import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('tagsStore')
@observer
export default class Edit extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  componentDidMount() {
    let tagID = this.props.params.tagID
    let tagForm = this.refs.tagForm
    this.props.tagsStore.fetchShow(tagID).then((response) => {
      if (response.status == 200) {
        this.refs.tagForm.setTag(response.data)
      }
    })
  }
  
  handleSubmit(params) {
    let tagID = this.props.params.tagID
    this.props.tagsStore.update(tagID, params).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/tags')
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
        ref='tagForm'
      />
    )
  }
}
