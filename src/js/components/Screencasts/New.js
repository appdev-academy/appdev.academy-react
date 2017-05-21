import React from 'react'
import { browserHistory } from 'react-router'
import { inject } from 'mobx-react'

import Form from './Form'

@inject('screencastsStore')
export default class New extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  handleSubmit(screencastParams) {
    let topicID = this.props.params.topicID
    
    this.props.screencastsStore.create(topicID, screencastParams).then((response) => {
      if (response.status == 200) {
        browserHistory.push(`/topics/${topicID}/screencasts`)
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
