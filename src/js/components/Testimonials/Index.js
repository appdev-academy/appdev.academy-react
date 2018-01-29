import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import TableBody from './TableBody'
import ConfirmationDialog from '../ConfirmationDialog'

@inject('testimonialsStore')
@observer
export default class Index extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    }
  }
  
  componentDidMount() {
    this.props.testimonialsStore.fetchIndex()
  }
  
  moveTestimonial(startIndex, dropIndex) {
    if (startIndex == dropIndex) {
      return
    }
    
    let testimonialIDs = this.props.testimonialsStore.testimonials.map((testimonial) => testimonial.id)
    let draggedTestimonialID = testimonialIDs[startIndex]
    testimonialIDs.splice(startIndex, 1)
    testimonialIDs.splice(dropIndex, 0, draggedTestimonialID)
    // Sort Testimonials on server (assign position property to each Testimonial according to order of IDs)
    this.props.testimonialsStore.sort(testimonialIDs)
  }
  
  showDeleteConfirmationDialog(entity) {
    this.setState({
      deleteConfirmationDialogShow: true,
      deleteConfirmationDialogEntityID: entity.id,
      deleteConfirmationDialogEntityTitle: entity.title
    })
  }
  
  hideDeleteConfirmationDialog() {
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    })
  }
  
  deleteButtonClick() {
    this.props.testimonialsStore.delete(this.state.deleteConfirmationDialogEntityID);
    this.setState({
      deleteConfirmationDialogShow: false,
      deleteConfirmationDialogEntityID: null,
      deleteConfirmationDialogEntityTitle: null
    })
  }
  
  render() {
    return (
      <div className='testimonials'>
        <h2 className='center'>Testimonials</h2>
        <Link className='button blue' to='/testimonials/new'>+ New Testimonial</Link>
        <br />
        <br />
        <table className='admin'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Company</td>
              <td>Full name</td>
              <td>Profile picture</td>
              <td>Position</td>
              <td>Actions</td>
              <td>Publish</td>
            </tr>
          </thead>
          <TableBody
            testimonials={ this.props.testimonialsStore.testimonials }
            publishButtonClick={ (testimonialID) => { this.props.testimonialsStore.publish(testimonialID) }}
            hideButtonClick={ (testimonialID) => { this.props.testimonialsStore.hide(testimonialID) }}
            deleteButtonClick={ (testimonial) => { this.showDeleteConfirmationDialog(testimonial) }}
            moveTestimonial={ this.moveTestimonial.bind(this) }
          />
        </table>
        <ConfirmationDialog
          actionButtonClick={ () => { this.deleteButtonClick() }}
          actionName='delete'
          cancelButtonClick= { () => { this.hideDeleteConfirmationDialog() }}
          destructive={ true }
          entityName='testimonial'
          entityTitle={ this.state.deleteConfirmationDialogEntityTitle }
          show={ this.state.deleteConfirmationDialogShow }
        />
      </div>
    )
  }
}
