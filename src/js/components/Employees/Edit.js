import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('employeesStore')
@observer
export default class Edit extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  componentDidMount() {
    let employeeID = this.props.params.employeeID
    let employeeForm = this.refs.employeeForm
    this.props.employeesStore.fetchShow(employeeID).then((response) => {
      if (response.status == 200) {
        employeeForm.setEmployee(response.data.employee)
      }
    })
  }
  
  handleSubmit(params) {
    let employeeID = this.props.params.employeeID
    this.props.employeesStore.update(employeeID, params).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/employees')
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
        ref='employeeForm'
      />
    )
  }
}
