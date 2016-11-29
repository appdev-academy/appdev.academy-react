import React from 'react'

import BlueButton from '../Buttons/Blue'

export default class Login extends React.Component {
  
  handleSubmit() {
    let email = this.refs.email.value
    let password = this.refs.password.value
    console.log('Submit email: ' + email + ' and password: ' + password);
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