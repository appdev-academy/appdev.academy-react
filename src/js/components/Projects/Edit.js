import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'
import GalleryImages from '../GalleryImages/Index'

@inject('galleryImagesStore')
@inject('projectsStore')
@inject('tagsStore')
@observer
export default class Edit extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  componentDidMount() {
    let projectID = this.props.params.projectID
    let projectForm = this.refs.projectForm
    this.props.projectsStore.fetchShow(projectID).then((response) => {
      if (response.status == 200) {
        projectForm.setProject(response.data)
      }
    })
  }
  
  handleSubmit(params) {
    let projectID = this.props.params.projectID
    this.props.projectsStore.update(projectID, params).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/projects')
      }
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        this.setState({
          errors: error.response.data.errors
        })
      }
    })
  }
  
  render() {
    let projectID = this.props.params.projectID
    
    return (
      <div>
        <Form
          tagsStore={ this.props.tagsStore }
          allTags={ this.props.tagsStore.tags }
          errors={ this.state.errors }
          handleSubmit={ this.handleSubmit.bind(this) }
          ref='projectForm'
        />
        <GalleryImages
          galleryImagesStore={ this.props.galleryImagesStore }
          projectID={ projectID }
        />
      </div>
    )
  }
}
