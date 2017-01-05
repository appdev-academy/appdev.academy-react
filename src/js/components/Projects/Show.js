import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('projectsStore')
@observer
export default class Show extends React.Component {
  
  componentDidMount() {
    let projectID = this.props.params.projectID
    this.props.projectsStore.fetchShow(projectID).then(response => {
      if (response.status == 200) {
        this.props.projectsStore.project = response.data
      }
    })
  }
  
  render() {
    let project = this.props.projectsStore.project
    return (
      <div className='project-container'>
        <h2 className='center'>{ project.title }</h2>
        <div dangerouslySetInnerHTML={{ __html: project.html_content }} />
      </div>
    )
  }
}