import React from 'react'
import { Link } from 'react-router'

import ErrorsList from '../ErrorsList'
import BlueButton from '../Buttons/Blue'
import GreenButton from '../Buttons/Green'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      profilePicture: ''
    }
  }
  
  setEmployee(employee) {
    if (employee) {
      this.refs.firstName.value = employee.first_name,
      this.refs.lastName.value = employee.last_name,
      this.refs.title.value = employee.title,
      this.setState({
        profilePicture: employee.profile_picture
      })
    }
  }
  
  selectFile() {
    this.refs.profilePicture.click()
  }
  
  didSelectFile() {
    let file = this.refs.profilePicture.files[0]
    let reader = new FileReader()
    
    reader.onload = (event) => {
      this.setState({
        file: file,
        profilePicture: reader.result
      })
    }
    reader.readAsDataURL(file)
  }
  
  // Form submition
  handleSubmit(event) {
    event.preventDefault()
    let formData = new FormData()
    
    formData.append('employee[first_name]', this.refs.firstName.value)
    formData.append('employee[last_name]', this.refs.lastName.value)
    formData.append('employee[title]', this.refs.title.value)
    
    if (this.state.file) {
      formData.append('employee[profile_picture]', this.state.file)
    }
    
    this.props.handleSubmit(formData)
  }
  
  render () {
    return (
      <div className='column'>
        <ErrorsList errors={ this.props.errors } />
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' ref='title' id='title' autoFocus={ true } />
        </div>
        <div className='form-group'>
          <label htmlFor='firstName'>First name</label>
          <input type='text' ref='firstName' id='firstName' />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last name</label>
          <input type='text' ref='lastName' id='lastName' />
        </div>
        <div className='form-group employee-picture'>
          <label htmlFor='profilePicture'>Profile picture</label>
          <img src={ this.state.profilePicture } onClick={ this.selectFile.bind(this) } />
          <input
            name='profilePicture'
            id='profilePicture'
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={ this.didSelectFile.bind(this) }
            ref='profilePicture'
          />
        </div>
        <div className='actions left'>
          <GreenButton
            title='Save'
            onClick={ this.handleSubmit.bind(this) }
          />
          <Link className='button blue' to={ `/employees` }>Back to Employees</Link>
        </div>
      </div>
    )
  }
}
