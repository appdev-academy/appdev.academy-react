import React from 'react'

export default class Red extends React.Component {
  render() {
    return (
      <button type='button' className='button red' onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

Red.propTypes = {
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}