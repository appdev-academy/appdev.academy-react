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
        this.props.employeesStore.employee = response.data
      }
    })
  }
  
  render() {
    let employee = this.props.employeesStore.employee
    return (
      <div className='full-width'>
        <h2 className='center'>{ employee.title }</h2>
        <h2 className='center'>{ employee.first_name }</h2>
        //<div className='article-container' dangerouslySetInnerHTML={{ __html: employee.first_name }} />
        <div className='actions center'>
          <Link to={ `/employees/${employee.id}/edit` } className='button orange'>Edit</Link>
          <Link to={ '/employees/' } className='button blue'>Back to Employees</Link>
        </div>
      </div>
    )
  }
}
