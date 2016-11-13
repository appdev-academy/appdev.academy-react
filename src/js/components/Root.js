import React from 'react'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h2>I am root component</h2>
        { this.props.children }
      </div>
    )
  }
}