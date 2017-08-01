import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import TableRow from './TableRow'

@DragDropContext(HTML5Backend)
export default class TableBody extends React.Component {
  
  moveRow(startIndex, dropIndex) {
    this.props.moveTopic(startIndex, dropIndex)
  }
  
  render() {
    let topics = this.props.topics
    
    return (
      <tbody>
        { topics.map((topic, index) => {
          return (
            <TableRow
              key={ topic.id }
              topic={ topic }
              publishButtonClick={ (topicID) => { this.props.publishButtonClick(topicID) }}
              hideButtonClick={ (topicID) => { this.props.hideButtonClick(topicID) }}
              id={ topic.id }
              index={ index }
              text={ topic.title }
              moveRow= { this.moveRow.bind(this) }
            />
          )
        })}
      </tbody>
    )
  }
}
