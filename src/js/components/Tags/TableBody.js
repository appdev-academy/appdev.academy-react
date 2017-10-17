import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'

import TableRow from './TableRow'

export default class TableBody extends React.Component {
  render() {
    let tags = this.props.tags
    
    return (
      <tbody>
        { tags.map((tag, index) => {
          return (
            <TableRow
              key={ tag.id }
              tag={ tag }
              deleteButtonClick={ (tag) => { this.props.deleteButtonClick(tag) }}
            />
          )
        })}
      </tbody>
    )
  }
}
