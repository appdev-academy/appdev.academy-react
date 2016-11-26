import React from 'react'
import classNames from 'classnames'

export default class Orange extends React.Component {
  
  render() {
    let buttonClasses = classNames({
      'button': true,
      'orange': true,
      'small': this.props.small
    })
    
    return (
      <button type='button' className={ buttonClasses } onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

Orange.propTypes = {
  title: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

Orange.defaultProps = {
  small: false
}