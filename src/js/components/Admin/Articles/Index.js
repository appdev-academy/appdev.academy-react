import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import TableBody from './TableBody'

@inject('articlesStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.articlesStore.fetchIndex()
  }
  
  render() {
    return (
      <div className='articles'>
        <h2 className='center'>Articles</h2>
        <Link className='button blue' to='/admin/articles/new'>+ New Article</Link>
        <br />
        <br />
        <table className='admin'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Actions</td>
              <td>Publish</td>
            </tr>
          </thead>
          <TableBody
            articles={ this.props.articlesStore.articles }
            deleteButtonClick={ (articleID) => { this.props.articlesStore.delete(articleID) }}
            publishButtonClick={ (articleID) => { this.props.articlesStore.publish(articleID) }}
            hideButtonClick={ (articleID) => { this.props.articlesStore.hide(articleID) }}
          />
        </table>
      </div>
    )
  }
}