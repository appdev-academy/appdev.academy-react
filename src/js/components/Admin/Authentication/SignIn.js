import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import BlueButton from '../../Buttons/Blue'

@inject('sessionsStore')
@observer
export default class SignIn extends React.Component {
  
  handleSubmit() {
    let email = this.refs.email.value
    let password = this.refs.password.value
    this.props.sessionsStore.create(email, password)
  }
  
  render() {
    return (
      <div className='login-container'>
        <form className='login-form' onSubmit={ this.handleSubmit.bind(this) }>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              ref='email'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              ref='password'
            />
          </div>
          <BlueButton
            title='Sign In'
            small={ true }
            onClick={ this.handleSubmit.bind(this) }
          />
        </form>
      </div>
    )
  }
}