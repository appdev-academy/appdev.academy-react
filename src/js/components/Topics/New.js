import React from 'react'
import { browserHistory } from 'react-router'
import { inject } from 'mobx-react'

import Form from './Form'

@inject('topicsStore')
export default class New extends React.Component {
  
  handleSubmit(topicParams) {
    this.props.topicsStore.create(topicParams).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/topics')
      }
    })
  }
  
  render() {
    return (
      <Form handleSubmit={ this.handleSubmit.bind(this) } />
    )
  }
}
