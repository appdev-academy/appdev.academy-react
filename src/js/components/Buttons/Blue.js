import React from 'react'
import ClassNames from 'classnames'

export default class Blue extends React.Component {
  
  render() {
    let buttonClasses = ClassNames({
      'button': true,
      'blue': true,
      'selected': this.props.selected,
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
  selected: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

Blue.defaultProps = {
  small: false,
  selected: false
}