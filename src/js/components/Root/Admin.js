import React from 'react'
import { Link } from 'react-router'

export default class Admin extends React.Component {
  render() {
    return (
      <div className='admin-container' >
        <div className='admin menu'>
          <Link to={ '/admin/articles' } activeClassName='active'>Articles</Link>
          <Link to={ '/admin/article_images' } activeClassName='active'>Article Images</Link>
        </div>
        { this.props.children }
      </div>
    )
  }
}