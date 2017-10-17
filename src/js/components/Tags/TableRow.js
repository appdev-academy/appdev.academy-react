import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router'

import GreenButton from '../Buttons/Green'
import OrangeButton from '../Buttons/Orange'
import RedButton from '../Buttons/Red'

export default class TableRow extends React.Component {
  render() {
    let tag = this.props.tag
    
    return (
      <tr key={ tag.id }>
        <td>{ tag.id }</td>
        <td>{ tag.title }</td>
        <td>{ tag.slug }</td>
        <td>{ tag.articles_count }</td>
        <td>{ tag.projects_count }</td>
        <td className='actions left'>
          <Link className='button green' to={ `/tags/${tag.id}/edit` }>Edit</Link>
          <RedButton title='Delete' onClick={ () => { this.props.deleteButtonClick(tag) }} />
        </td>
      </tr>
    )
  }
}
