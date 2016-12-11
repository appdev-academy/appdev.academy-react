import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('pagesStore')
@observer
export default class Show extends React.Component {
  
  componentDidMount() {
    // Fetch all Pages
    this.props.pagesStore.fetchIndex()
    // Make sure Page is among allowed ones
    let slug = this.props.params.slug
    if (!this.props.pagesStore.allowedPages.includes(slug)) {
      browserHistory.push('/admin/pages')
    }
  }
  
  render() {
    let slug = this.props.params.slug
    
    let pageContent = ''
    let page = this.props.pagesStore.pages.find(page => page.slug === slug)
    if (page) {
      pageContent = page.html_content
    }
    
    return (
      <div>
        <div className='article-container' dangerouslySetInnerHTML={{ __html: pageContent }} />
      </div>
    )
  }
}