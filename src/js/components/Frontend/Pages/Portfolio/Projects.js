import React from 'react'
import { browserHistory, Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('projectsStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.projectsStore.fetchIndex()
  }
  
  slugify(text) {
    return text.toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text
  }
  
  renderProjects(projects) {
    return projects.map((project) => {
      let slug = this.slugify(project.title)
      return (
        <li className='project-container' key={ project.id }>
          <Link className='project-title' to={ `/projects/${project.id}-${slug}` }>{ project.title }</Link>
          <div dangerouslySetInnerHTML={{ __html: project.html_preview }} />
        </li>
      )
    })
  }
  
  render() {
    let projects = this.props.projectsStore.projects.filter((project) => {
      return !project.is_hidden
    })
    
    return (
      <div className='full-width'>
        <ol className='list-of-articles'>
          { this.renderProjects(projects) }
        </ol>
      </div>
    )
  }
}