import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('screencastsStore')
@observer
export default class Edit extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  componentDidMount() {
    let screencastID = this.props.params.screencastID
    let screencastForm = this.refs.screencastForm
    this.props.screencastsStore.fetchShow(screencastID).then((response) => {
      if (response.status == 200) {
        screencastForm.setScreencast(response.data)
      }
    })
  }
  
  handleSubmit(params) {
    let topicID = this.props.params.topicID
    let screencastID = this.props.params.screencastID
    this.props.screencastsStore.update(screencastID, params).then((response) => {
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
        handleSubmit={ this.handleSubmit.bind(this) } ref='screencastForm'
      />
    )
  }
}
