import React from 'react'

export default class Green extends React.Component {
  render() {
    return (
      <button type='button' className='button green' onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

Green.propTypes = {
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}