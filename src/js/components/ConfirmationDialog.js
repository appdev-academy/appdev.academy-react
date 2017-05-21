import React, { PropTypes } from 'react'
import ClassNames from 'classnames'

import BlueButton from './Buttons/Blue'
import GreenButton from './Buttons/Green'
import RedButton from './Buttons/Red'

export default class ConfirmationDialog extends React.Component {
  
  render() {
    let confirmationClass = ClassNames({
      'confirmation-dialog': true,
      'show': this.props.show,
    })
    
    let title = `Are you sure you want to ${this.props.actionName} this ${this.props.entityName}?`
    if (this.props.entityTitle) {
      title = `Are you sure you want to ${this.props.actionName} ${this.props.entityName} called "${this.props.entityTitle}"?`
    }
    
    let actionButton = (
      <GreenButton
        title={ this.props.actionName.charAt(0).toUpperCase() + this.props.actionName.slice(1) }
        onClick={ () => { this.props.actionButtonClick() }}
      />
    )
    if (this.props.destructive) {
      actionButton = (
        <RedButton
          title={ this.props.actionName.charAt(0).toUpperCase() + this.props.actionName.slice(1) }
          onClick={ () => { this.props.actionButtonClick() }}
        />
      )
    }
    
    return (
      <div className={ confirmationClass }>
        <div className='container'>
          <h3 className='center'>{ title }</h3>
          <div className='buttons center'>
            { actionButton }
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

ConfirmationDialog.propTypes = {
  actionName: React.PropTypes.string.isRequired,
  destructive: React.PropTypes.bool,
  entityName: React.PropTypes.string.isRequired,
  entityTitle: React.PropTypes.string,
  show: React.PropTypes.bool
}

ConfirmationDialog.defaultProps = {
  destructive: false,
  show: true
}
