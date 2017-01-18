import React from 'react'
import { browserHistory } from 'react-router'
import { inject } from 'mobx-react'

import Form from './Form'

@inject('screencastsStore')
export default class New extends React.Component {
  
  handleSubmit(screencastParams) {
    let topicID = this.props.params.topicID
    
    this.props.screencastsStore.create(topicID, screencastParams).then((response) => {
      if (response.status == 200) {
        browserHistory.push(`/topics/${topicID}/screencasts`)
      }
    })
  }
  
  render() {
    return (
      <Form
        params={ this.props.params }
        handleSubmit={ this.handleSubmit.bind(this) }
      />
    )
  }
}
