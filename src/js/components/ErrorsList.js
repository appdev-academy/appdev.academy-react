import PropTypes from 'prop-types'
import React from 'react'

export default class ErrorsList extends React.Component {
  render() {
    let errorsList = null;
    if (this.props.errors.length) {
      errorsList = (
        <ul className='errors'>
          { this.props.errors.map((error, index) => {
            return (
              <li key={index}>{ error }</li>
            )
          })}
        </ul>
      )
    }
    
    return errorsList
  }
}

ErrorsList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
