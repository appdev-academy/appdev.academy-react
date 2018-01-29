import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import TableRow from './TableRow'

@DragDropContext(HTML5Backend)
export default class TableBody extends React.Component {
  
  moveRow(startIndex, dropIndex) {
    this.props.moveTestimonial(startIndex, dropIndex)
  }
  
  render() {
    let testimonials = this.props.testimonials
    
    return (
      <tbody>
        { testimonials.map((testimonial, index) => {
          return (
            <TableRow
              key={ testimonial.id }
              testimonial={ testimonial }
              publishButtonClick={ (testimonialID) => { this.props.publishButtonClick(testimonialID) }}
              hideButtonClick={ (testimonialID) => { this.props.hideButtonClick(testimonialID) }}
              deleteButtonClick={ (testimonial) => { this.props.deleteButtonClick(testimonial) }}
              id={ testimonial.id }
              index={ index }
              text={ testimonial.title }
              moveRow= { this.moveRow.bind(this) }
            />
          )
        })}
      </tbody>
    )
  }
}
