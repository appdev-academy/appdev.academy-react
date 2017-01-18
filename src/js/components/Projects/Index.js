import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import TableBody from './TableBody'

@inject('projectsStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.projectsStore.fetchIndex()
  }
  
  moveProject(startIndex, dropIndex) {
    if (startIndex == dropIndex) {
      return
    }
    
    let projectIDs = this.props.projectsStore.projects.map((project) => project.id)
    let draggedProjectID = projectIDs[startIndex]
    projectIDs.splice(startIndex, 1)
    projectIDs.splice(dropIndex, 0, draggedProjectID)
    // Sort Projects on server (assign position property to each Project according to order of IDs)
    this.props.projectsStore.sort(projectIDs)
  }
  
  render() {
    return (
      <div className='projects'>
        <h2 className='center'>Projects</h2>
        <Link className='button blue' to='/projects/new'>+ New Project</Link>
        <br />
        <br />
        <table className='admin'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Slug</td>
              <td>Position</td>
              <td>Actions</td>
              <td>Publish</td>
            </tr>
          </thead>
          <TableBody
            projects={ this.props.projectsStore.projects }
            publishButtonClick={ (projectID) => { this.props.projectsStore.publish(projectID) }}
            hideButtonClick={ (projectID) => { this.props.projectsStore.hide(projectID) }}
            moveProject={ this.moveProject.bind(this) }
          />
        </table>
      </div>
    )
  }
}
