import React from 'react'
import classNames from 'classnames'

export default class Red extends React.Component {
  
  render() {
    let buttonClasses = classNames({
      'button': true,
      'red': true,
      'small': this.props.small
    })
    
    return (
      <button type='button' className={ buttonClasses } onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

Red.propTypes = {
  title: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

Red.defaultProps = {
  small: false
}