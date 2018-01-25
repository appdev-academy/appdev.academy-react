import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('employeesStore')
@observer
export default class Show extends React.Component {
  
  componentDidMount() {
    let employeeID = this.props.params.employeeID
    this.props.employeesStore.fetchShow(employeeID).then(response => {
      if (response.status == 200) {
        this.props.employeesStore.employee = response.data.employee
      }
    })
  }
  
  render() {
    let employee = this.props.employeesStore.employee
    
    return (
      <div className='full-width'>
        <table className='employee-profile'>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{ employee.id }</td>
            </tr>
            <tr>
              <td>Title:</td>
              <td>{ employee.title }</td>
            </tr>
            <tr>
              <td>First name:</td>
              <td>{ employee.first_name }</td>
            </tr>
            <tr>
              <td>Last name:</td>
              <td>{ employee.last_name }</td>
            </tr>
            <tr>
              <td>Profile picture:</td>
              <td><img className='profile-picture' src={ employee.profile_picture } /></td>
            </tr>
            <tr>
              <td>Updated at:</td>
              <td>{ employee.updated_at }</td>
            </tr>
            <tr>
              <td>Published:</td>
              <td>{ String(employee.published) }</td>
            </tr>
            <tr>
              <td>Position:</td>
              <td>{ employee.position }</td>
            </tr>
          </tbody>
        </table>
        <div className='actions center'>
          <Link to={ `/employees/${employee.id}/edit` } className='button orange'>Edit</Link>
          <Link to={ '/employees/' } className='button blue'>Back to Employees</Link>
        </div>
      </div>
    )
  }
}
