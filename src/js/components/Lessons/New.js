import React from 'react'
import { browserHistory } from 'react-router'
import { inject } from 'mobx-react'

import Form from './Form'

@inject('lessonsStore')
export default class New extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  handleSubmit(screencastParams) {
    let topicID = this.props.params.topicID
    let screencastID = this.props.params.screencastID
    
    this.props.lessonsStore.create(screencastID, screencastParams).then((response) => {
      if (response.status == 200) {
        browserHistory.push(`/topics/${topicID}/screencasts/${screencastID}/lessons`)
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
        params={ this.props.params }
        handleSubmit={ this.handleSubmit.bind(this) }
      />
    )
  }
}
