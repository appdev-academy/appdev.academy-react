import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('lessonsStore')
@observer
export default class Edit extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  componentDidMount() {
    let lessonID = this.props.params.lessonID
    let lessonForm = this.refs.lessonForm
    this.props.lessonsStore.fetchShow(lessonID).then((response) => {
      if (response.status == 200) {
        lessonForm.setLesson(response.data)
      }
    })
  }
  
  handleSubmit(params) {
    let topicID = this.props.params.topicID
    let screencastID = this.props.params.screencastID
    let lessonID = this.props.params.lessonID
    
    this.props.lessonsStore.update(lessonID, params).then((response) => {
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
        handleSubmit={ this.handleSubmit.bind(this) } ref='lessonForm'
      />
    )
  }
}
