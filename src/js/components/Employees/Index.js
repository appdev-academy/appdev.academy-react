import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import TableBody from './TableBody'
import ConfirmationDialog from '../ConfirmationDialog'

@inject('employeesStore')
@observer
export default class Index extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    }
  }
  
  componentDidMount() {
    this.props.employeesStore.fetchIndex()
  }
  
  moveEmployee(startIndex, dropIndex) {
    if (startIndex == dropIndex) {
      return
    }
    
    let employeeIDs = this.props.employeesStore.employees.map((employee) => employee.id)
    let draggedEmployeeID = employeeIDs[startIndex]
    employeeIDs.splice(startIndex, 1)
    employeeIDs.splice(dropIndex, 0, draggedEmployeeID)
    // Sort Employees on server (assign position property to each Employee according to order of IDs)
    this.props.employeesStore.sort(employeeIDs)
  }
  
  showDeleteConfirmationDialog(entity) {
    this.setState({
      deleteConfirmationDialogShow: true,
      deleteConfirmationDialogEntityID: entity.id,
      deleteConfirmationDialogEntityTitle: entity.title
    })
  }
  
  hideDeleteConfirmationDialog() {
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    })
  }
  
  deleteButtonClick() {
    this.props.employeesStore.delete(this.state.deleteConfirmationDialogEntityID);
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    })
  }
  
  render() {
    return (
      <div className='employees'>
        <h2 className='center'>Employees</h2>
        <Link className='button blue' to='/employee/new'>+ New Employee</Link>
        <br />
        <br />
        <table className='admin'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Position</td>
              <td>Actions</td>
              <td>Publish</td>
            </tr>
          </thead>
          <TableBody
            employees={ this.props.employeesStore.employees }
            publishButtonClick={ (employeeID) => { this.props.employeesStore.publish(employeeID) }}
            hideButtonClick={ (employeeID) => { this.props.employeesStore.hide(employeeID) }}
            deleteButtonClick={ (employee) => { this.showDeleteConfirmationDialog(employee) }}
            moveEmployee={ this.moveEmployee.bind(this) }
          />
        </table>
        <ConfirmationDialog
          actionButtonClick={ () => { this.deleteButtonClick() }}
          actionName='delete'
          cancelButtonClick= { () => { this.hideDeleteConfirmationDialog() }}
          destructive={ true }
          entityName='employee'
          entityTitle={ this.state.deleteConfirmationDialogEntityTitle }
          show={ this.state.deleteConfirmationDialogShow }
        />
      </div>
    )
  }
}
