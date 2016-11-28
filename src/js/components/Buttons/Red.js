import React from 'react'
import ClassNames from 'classnames'

export default class Red extends React.Component {
  
  render() {
    let buttonClasses = ClassNames({
      'button': true,
      'red': true,
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

Red.propTypes = {
  title: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
  selected: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

Red.defaultProps = {
  small: false,
  selected: false
}