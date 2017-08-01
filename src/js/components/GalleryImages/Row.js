import PropTypes from 'prop-types'
import React from 'react'
import { inject, observer } from 'mobx-react'

import RedButton from '../Buttons/Red'

export default class Row extends React.Component {
  
  handleDelete() {
    let articleImageID = this.props.image.id
    this.props.galleryImagesStore.delete(articleImageID)
  }
  
  render() {
    let image = this.props.image
    
    return (
      <tr>
        <td>
          <img src={ image.thumb } />
        </td>
        <td>
          <span>Thumb URL: </span>
          <a href={ image.thumb }>{ image.thumb} </a>
          <br />
          <span>Original URL: </span>
          <a href={ image.original }>{ image.original }</a>
        </td>
        <td>
          <RedButton
            title='Delete'
            onClick={ () => { this.props.deleteButtonClick(this.props.image.id) }}
          />
        </td>
      </tr>
    )
  }
}

Row.propTypes = {
  image: PropTypes.object.isRequired
}
