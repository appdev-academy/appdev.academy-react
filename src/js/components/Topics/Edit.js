import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('topicsStore')
@observer
export default class Edit extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
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
        ref='topicForm'
      />
    )
  }
}
