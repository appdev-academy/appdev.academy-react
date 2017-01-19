import React from 'react'
import { browserHistory, Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('pagesStore')
@observer
export default class Show extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      htmlContent: ''
    }
  }
  
  componentDidMount() {
    // Make sure Page is among allowed ones
    let slug = this.props.params.slug
    if (!this.props.pagesStore.allowedPages.includes(slug)) {
      browserHistory.push('/pages')
    }
    // Fetch Page to show
    this.props.pagesStore.fetchShow(slug).then((response) => {
      if (response.status == 200) {
        this.setState({
          htmlContent: response.data.html_content
        })
      }
    })
  }
  
  render() {
    let slug = this.props.params.slug
    
    return (
      <div>
        <div className='page-container' dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
        <div className='actions center'>
          <Link to={ `/pages/${slug}/edit` } className='button orange'>Edit</Link>
          <Link to={ '/pages/' } className='button blue'>Back to Pages</Link>
        </div>
      </div>
    )
  }
}
