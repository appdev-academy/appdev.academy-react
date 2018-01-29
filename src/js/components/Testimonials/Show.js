import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('testimonialsStore')
@observer
export default class Show extends React.Component {
  
  componentDidMount() {
    let testimonialID = this.props.params.testimonialID
    this.props.testimonialsStore.fetchShow(testimonialID).then(response => {
      if (response.status == 200) {
        this.props.testimonialsStore.testimonial = response.data.testimonial
      }
    })
  }
  
  render() {
    let testimonial = this.props.testimonialsStore.testimonial
    
    return (
      <div className='full-width'>
        <table className='admin'>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{ testimonial.id }</td>
            </tr>
            <tr>
              <td>Title:</td>
              <td>{ testimonial.title }</td>
            </tr>
            <tr>
              <td>Company:</td>
              <td>{ testimonial.company }</td>
            </tr>
            <tr>
              <td>First name:</td>
              <td>{ testimonial.first_name }</td>
            </tr>
            <tr>
              <td>Last name:</td>
              <td>{ testimonial.last_name }</td>
            </tr>
            <tr>
              <td>Profile picture:</td>
              <td><img className='profile-picture' src={ testimonial.profile_picture } /></td>
            </tr>
            <tr>
              <td>Updated at:</td>
              <td>{ testimonial.updated_at }</td>
            </tr>
            <tr>
              <td>Published:</td>
              <td>{ String(testimonial.published) }</td>
            </tr>
            <tr>
              <td>Position:</td>
              <td>{ testimonial.position }</td>
            </tr>
            <tr>
              <td>html_body:</td>
              <td className='testimonial-container' dangerouslySetInnerHTML={{ __html: testimonial.html_body }}/>
            </tr>
          </tbody>
        </table>
        <div className='actions center'>
          <Link to={ `/testimonials/${testimonial.id}/edit` } className='button orange'>Edit</Link>
          <Link to={ '/testimonials/' } className='button blue'>Back to Testimonials</Link>
        </div>
      </div>
    )
  }
}
