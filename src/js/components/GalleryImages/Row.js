import PropTypes from 'prop-types'
import React from 'react'
import { inject, observer } from 'mobx-react'

import { IMAGE_BASE_URL } from '../../constants'
import RedButton from '../Buttons/Red'

export default class Row extends React.Component {
  
  handleDelete() {
    let articleImageID = this.props.image.id
    this.props.galleryImagesStore.delete(articleImageID)
  }
  
  render() {
    let image = this.props.image
    let thumbURL = IMAGE_BASE_URL + image.thumb
    let originalURL = IMAGE_BASE_URL + image.original
    
    return (
      <tr>
        <td>
          <img src={ thumbURL } />
        </td>
        <td>
          <span>Thumb URL: </span>
          <a href={ thumbURL }>{ thumbURL} </a>
          <br />
          <span>Original URL: </span>
          <a href={ originalURL }>{ originalURL }</a>
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
