import React from 'react'

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome admin</h2>
        <a href='/admin/articles'>Articles</a>
        { this.props.children }
      </div>
    )
  }
}