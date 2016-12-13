import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'
import { DragSource, DropTarget } from 'react-dnd'

import RedButton from '../../Buttons/Red'
import GreenButton from '../../Buttons/Green'
import OrangeButton from '../../Buttons/Orange'

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
    console.log("===========================");
    console.log("Title: " + props.article.title)
    console.log("Source index: " + props.index)
    console.log("Destination index: " + monitor.getItem().index)
    console.log("didDrop: " + monitor.didDrop())
    console.dir(props)
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }
    
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }
    
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }
    
    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex)
    
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

@DropTarget(
  "ARTICLE_ROW",
  cardTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)
@DragSource(
  "ARTICLE_ROW",
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
    
    let article = this.props.article
    let publishButton = <GreenButton title='Publish' onClick={ () => { this.props.publishButtonClick(article.id) }} />
    if (article.published_at && !article.is_hidden) {
      publishButton = <OrangeButton title='Hide' onClick={ () => { this.props.hideButtonClick(article.id) }} />
    }
    
    return connectDragSource(connectDropTarget(
      <tr key={ article.id }>
        <td>{ article.title }</td>
        <td className='actions left'>
          <Link className='button blue' to={ `/admin/articles/${article.id}` }>Show</Link>
          <Link className='button green' to={ `/admin/articles/${article.id}/edit` }>Edit</Link>
          <RedButton
            title='Delete'
            onClick={ () => { this.props.deleteButtonClick(article.id) }}
          />
        </td>
        <td className='actions left'>
          { publishButton }
        </td>
      </tr>
    ))
  }
}