import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import TableRow from './TableRow'

@DragDropContext(HTML5Backend)
export default class TableBody extends React.Component {
  
  moveRow(startIndex, dropIndex) {
    this.props.moveScreencast(startIndex, dropIndex)
  }
  
  render() {
    let screencasts = this.props.screencasts
    
    return (
      <tbody>
        { screencasts.map((screencast, index) => {
          return (
            <TableRow
              key={ screencast.id }
              screencast={ screencast }
              publishButtonClick={ (topicID, screencastID) => { this.props.publishButtonClick(topicID, screencastID) }}
              hideButtonClick={ (topicID, screencastID) => { this.props.hideButtonClick(topicID, screencastID) }}
              id={ screencast.id }
              index={ index }
              text={ screencast.title }
              moveRow= { this.moveRow.bind(this) }
            />
          )
        })}
      </tbody>
    )
  }
}
