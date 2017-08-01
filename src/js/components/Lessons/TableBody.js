import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import TableRow from './TableRow'

@DragDropContext(HTML5Backend)
export default class TableBody extends React.Component {
  
  moveRow(startIndex, dropIndex) {
    this.props.moveLesson(startIndex, dropIndex)
  }
  
  render() {
    let lessons = this.props.lessons
    
    return (
      <tbody>
        { lessons.map((lesson, index) => {
          return (
            <TableRow
              key={ lesson.id }
              lesson={ lesson }
              publishButtonClick={ (screencastID, lessonID) => { this.props.publishButtonClick(screencastID, lessonID) }}
              hideButtonClick={ (screencastID, lessonID) => { this.props.hideButtonClick(screencastID, lessonID) }}
              id={ lesson.id }
              index={ index }
              text={ lesson.title }
              moveRow= { this.moveRow.bind(this) }
            />
          )
        })}
      </tbody>
    )
  }
}
