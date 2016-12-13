import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import RedButton from '../../Buttons/Red'
import GreenButton from '../../Buttons/Green'
import OrangeButton from '../../Buttons/Orange'

export default class TableRow extends React.Component {
  
  render() {
    let article = this.props.article
    let publishButton = <GreenButton title='Publish' onClick={ () => { this.props.publishButtonClick(article.id) }} />
    if (article.published_at && !article.is_hidden) {
      publishButton = <OrangeButton title='Hide' onClick={ () => { this.props.hideButtonClick(article.id) }} />
    }
    
    return (
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
    )
  }
}