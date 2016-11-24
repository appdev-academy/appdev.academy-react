import React from 'react'

import { IMAGE_BASE_URL } from '../../constants'

export default class ArticleImageRow extends React.Component {
  
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
          <a href={ thumbURL }>Thumb URL</a>
        </td>
        <td>
          <a href={ regularURL }>Regular URL</a>
        </td>
        <td>
          Actions
        </td>
      </tr>
    )
  }
}

ArticleImageRow.propTypes = {
  image: React.PropTypes.object.isRequired
}