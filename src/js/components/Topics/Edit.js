import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('topicsStore')
@observer
export default class Edit extends React.Component {
  
  componentDidMount() {
    let topicID = this.props.params.topicID
    let topicForm = this.refs.topicForm
    this.props.topicsStore.fetchShow(topicID).then((response) => {
      if (response.status == 200) {
        topicForm.setTopic(response.data)
      }
    })
  }
  
  handleSubmit(params) {
    let topicID = this.props.params.topicID
    this.props.topicsStore.update(topicID, params).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/topics')
      }
    })
  }
  
  render() {
    return (
      <Form handleSubmit={ this.handleSubmit.bind(this) } ref='topicForm' />
    )
  }
}
