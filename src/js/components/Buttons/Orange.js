import React from 'react'

export default class Orange extends React.Component {
  render() {
    return (
      <button type='button' className='button orange' onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

Orange.propTypes = {
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}