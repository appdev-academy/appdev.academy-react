import React from 'react'

import { IMAGE_BASE_URL } from '../../constants'

export default class Row extends React.Component {
  
  render() {
    let image = this.props.image
    let thumbURL = IMAGE_BASE_URL + image.thumb
    let regularURL = IMAGE_BASE_URL + image.regular
    
    return (
      <tr className='article-image'>
        <td>
          <img src={ thumbURL } />
        </td>
        <td>
          <a href={ thumbURL }>{ thumbURL }</a>
          <br />
          <br />
          <a href={ regularURL }>{ regularURL }</a>
        </td>
        <td>
          Actions
        </td>
      </tr>
    )
  }
}

Row.propTypes = {
  image: React.PropTypes.object.isRequired
}