import React from 'react'

export default class Blue extends React.Component {
  render() {
    return (
      <button type='button' className='button blue' onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

Blue.propTypes = {
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}