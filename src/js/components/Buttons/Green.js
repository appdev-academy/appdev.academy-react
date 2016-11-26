import React from 'react'
import classNames from 'classnames'

export default class Green extends React.Component {
  
  render() {
    let buttonClasses = classNames({
      'button': true,
      'green': true,
      'small': this.props.small
    })
    
    return (
      <button type='button' className={ buttonClasses } onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

Green.propTypes = {
  title: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

Green.defaultProps = {
  small: false
}