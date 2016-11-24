import React from 'react'

export default class Admin extends React.Component {
  render() {
    return (
      <div className='admin-container' >
        { this.props.children }
      </div>
    )
  }
}