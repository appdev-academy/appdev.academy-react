import React from 'react'
import { browserHistory } from 'react-router'
import { inject } from 'mobx-react'

import Form from './Form'

@inject('projectsStore')
export default class New extends React.Component {
  
  handleSubmit(projectParams) {
    this.props.projectsStore.create(projectParams).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/projects')
      }
    })
  }
  
  render() {
    return (
      <Form handleSubmit={ this.handleSubmit.bind(this) } />
    )
  }
}