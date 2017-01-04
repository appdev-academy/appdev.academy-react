import React from 'react'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'

@inject('projectsStore')
@observer
export default class Show extends React.Component {
  
  componentDidMount() {
    let projectID = this.props.params.projectID
    console.log(projectID);
    this.props.projectsStore.fetchShow(projectID).then(response => {
      if (response.status == 200) {
        this.props.projectsStore.project = response.data
      }
    })
  }
  
  render() {
    let project = this.props.projectsStore.project
    let metaTitle = 'App Dev Academy | ' + project.title
    
    return (
      <div className='article-container'>
        <Helmet title={ metaTitle } />
        <h2 className='center'>{ project.title }</h2>
        <div dangerouslySetInnerHTML={{ __html: project.html_content }} />
      </div>
    )
  }
}