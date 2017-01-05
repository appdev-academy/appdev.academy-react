import React, { PropTypes } from 'react'
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
  "PROJECT_ROW",
  cardTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)
@DragSource(
  "PROJECT_ROW",
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
    
    let project = this.props.project
    let publishButton = <GreenButton title='Publish' onClick={ () => { this.props.publishButtonClick(project.id) }} />
    if (!project.is_hidden) {
      publishButton = <OrangeButton title='Hide' onClick={ () => { this.props.hideButtonClick(project.id) }} />
    }
    
    return connectDragSource(connectDropTarget(
      <tr key={ project.id }>
        <td>{ project.title }</td>
        <td className='actions left'>
          <Link className='button blue' to={ `/projects/${project.id}` }>Show</Link>
          <Link className='button green' to={ `/projects/${project.id}/edit` }>Edit</Link>
        </td>
        <td className='actions left'>
          { publishButton }
        </td>
      </tr>
    ))
  }
}