import PropTypes from 'prop-types'
import React from 'react'
import ClassNames from 'classnames'

export default class Orange extends React.Component {
  
  render() {
    let buttonClasses = ClassNames({
      'button': true,
      'orange': true,
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

Orange.propTypes = {
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

Orange.defaultProps = {
  small: false,
  selected: false
}
