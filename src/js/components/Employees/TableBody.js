import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import TableRow from './TableRow'

@DragDropContext(HTML5Backend)
export default class TableBody extends React.Component {
  
  moveRow(startIndex, dropIndex) {
    this.props.moveEmployee(startIndex, dropIndex)
  }
  
  render() {
    let employees = this.props.employees
    
    return (
      <tbody>
        { employees.map((employee, index) => {
          return (
            <TableRow
              key={ employee.id }
              employee={ employee }
              publishButtonClick={ (employeeID) => { this.props.publishButtonClick(employeeID) }}
              hideButtonClick={ (employeeID) => { this.props.hideButtonClick(employeeID) }}
              deleteButtonClick={ (employee) => { this.props.deleteButtonClick(employee) }}
              id={ employee.id }
              index={ index }
              text={ employee.title }
              moveRow= { this.moveRow.bind(this) }
            />
          )
        })}
      </tbody>
    )
  }
}
