import React from 'react'
import { inject, observer } from 'mobx-react'

import { IMAGE_BASE_URL } from '../../../constants'
import RedButton from '../../Buttons/Red'

@inject('articleImagesStore')
@observer
export default class Row extends React.Component {
  
  handleDelete() {
    let articleImageID = this.props.image.id
    this.props.articleImagesStore.delete(articleImageID)
  }
  
  render() {
    let image = this.props.image
    let thumbURL = IMAGE_BASE_URL + image.thumb
    let regularURL = IMAGE_BASE_URL + image.regular
    let originalURL = IMAGE_BASE_URL + image.original
    
    return (
      <tr className='article-image'>
        <td>
          <img src={ thumbURL } />
        </td>
        <td>
          <a href={ thumbURL }> Thumbnail URL </a>
          <br />
          <a href={ regularURL }> Regular URL </a>
          <br />
          <a href={ originalURL }> Original URL </a>
        </td>
        <td>
          <RedButton
            title='Delete'
            onClick={ this.handleDelete.bind(this) }
          />
        </td>
      </tr>
    )
  }
}

Row.propTypes = {
  image: React.PropTypes.object.isRequired
}