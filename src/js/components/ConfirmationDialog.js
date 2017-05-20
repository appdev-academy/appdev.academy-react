import React from 'react'
import ClassNames from 'classnames'

import BlueButton from './Buttons/Blue'
import RedButton from './Buttons/Red'

export default class NotFound extends React.Component {
  
  render() {
    let confirmationClass = ClassNames({
      'confirmation-dialog': true,
      'show': this.props.show,
    })
    
    return (
      <div className={ confirmationClass }>
        <div className='container'>
          <h3>{ this.props.text }</h3>
          <div className='buttons center'>
            <RedButton
              title='Delete'
              onClick={ () => { this.props.okButtonClick() }}
            />
            <BlueButton
              title='Cancel'
              onClick={ () => { this.props.cancelButtonClick() }}
            />
          </div>
        </div>
      </div>
    )
  }
}
