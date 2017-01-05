import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('projectsStore')
@observer
export default class Edit extends React.Component {
  
  componentDidMount() {
    let projectID = this.props.params.projectID
    let projectForm = this.refs.projectForm
    this.props.projectsStore.fetchShow(projectID).then((response) => {
      if (response.status == 200) {
        projectForm.setProject(response.data)
      }
    })
  }
  
  handleSubmit(params) {
    let projectID = this.props.params.projectID
    this.props.projectsStore.update(projectID, params).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/projects')
      }
    })
  }
  
  render() {
    return (
      <Form handleSubmit={ this.handleSubmit.bind(this) } ref='projectForm' />
    )
  }
}