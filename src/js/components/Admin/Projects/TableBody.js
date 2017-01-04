import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import TableRow from './TableRow'

@DragDropContext(HTML5Backend)
export default class TableBody extends React.Component {
  
  moveRow(startIndex, dropIndex) {
    this.props.moveProject(startIndex, dropIndex)
  }
  
  render() {
    let projects = this.props.projects
    
    return (
      <tbody>
        { projects.map((project, index) => {
          return (
            <TableRow
              key={ project.id }
              project={ project }
              publishButtonClick={ (projectID) => { this.props.publishButtonClick(projectID) }}
              hideButtonClick={ (projectID) => { this.props.hideButtonClick(projectID) }}
              id={ project.id }
              index={ index }
              text={ project.title }
              moveRow= { this.moveRow.bind(this) }
            />
          )
        })}
      </tbody>
    )
  }
}