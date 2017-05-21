import React from 'react'
import { inject, observer } from 'mobx-react'

import { IMAGE_BASE_URL } from '../../constants'
import RedButton from '../Buttons/Red'

@inject('imagesStore')
@observer
export default class Row extends React.Component {
  
  handleDelete() {
    let articleImageID = this.props.image.id
    this.props.imagesStore.delete(articleImageID)
  }
  
  render() {
    let image = this.props.image
    let thumbURL = IMAGE_BASE_URL + image.thumb
    let regularURL = IMAGE_BASE_URL + image.regular
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
          <span>Regular URL: </span>
          <a href={ regularURL }>{ regularURL }</a>
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
  image: React.PropTypes.object.isRequired
}
