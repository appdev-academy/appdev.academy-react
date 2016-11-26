import React from 'react'
import classNames from 'classnames'

export default class Blue extends React.Component {
  
  render() {
    let buttonClasses = classNames({
      'button': true,
      'blue': true,
      'small': this.props.small
    })
    
    return (
      <button type='button' className={ buttonClasses } onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

Blue.propTypes = {
  title: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

Blue.defaultProps = {
  small: false
}