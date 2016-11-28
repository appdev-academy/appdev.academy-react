import React from 'react'
import ClassNames from 'classnames'

export default class Green extends React.Component {
  
  render() {
    let buttonClasses = ClassNames({
      'button': true,
      'green': true,
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

Green.propTypes = {
  title: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
  selected: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

Green.defaultProps = {
  small: false,
  selected: false
}