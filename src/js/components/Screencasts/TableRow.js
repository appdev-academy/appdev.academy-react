import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import { DragSource, DropTarget } from 'react-dnd'

import GreenButton from '../Buttons/Green'
import OrangeButton from '../Buttons/Orange'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  },
  
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      let startIndex = props.index
      let dropIndex = monitor.getItem().index
      props.moveRow(startIndex, dropIndex)
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = props.index
  }
}

@DropTarget(
  "SCREENCAST_ROW",
  cardTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)
@DragSource(
  "SCREENCAST_ROW",
  cardSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)
export default class TableRow extends React.Component {
  
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveRow: PropTypes.func.isRequired
  }
  
  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    
    let screencast = this.props.screencast
    let publishButton = <GreenButton title='Publish' onClick={ () => { this.props.publishButtonClick(screencast.topic_id, screencast.id) }} />
    if (!screencast.is_hidden) {
      publishButton = <OrangeButton title='Hide' onClick={ () => { this.props.hideButtonClick(screencast.topic_id, screencast.id) }} />
    }
    
    return connectDragSource(connectDropTarget(
      <tr key={ screencast.id }>
        <td>{ screencast.id }</td>
        <td>{ screencast.title }</td>
        <td>{ screencast.slug }</td>
        <td>{ screencast.position }</td>
        <td className='actions left'>
          <Link className='button green' to={ `/topics/${screencast.topic_id}/screencasts/${screencast.id}/edit` }>Edit</Link>
          <Link className='button blue' to={ `/topics/${screencast.topic_id}/screencasts/${screencast.id}/lessons` }>Lessons</Link>
        </td>
        <td className='actions left'>
          { publishButton }
        </td>
      </tr>
    ))
  }
}
