import React from 'react'
import { browserHistory } from 'react-router'
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
    if (this.props.pagesStore.allowedPages.includes(slug)) {
      this.fetchPage(slug)
    } else {
      browserHistory.push('/')
    }
  }
  
  componentWillReceiveProps(nextProps) {
    let slug = nextProps.params.slug
    if (slug) {
      this.fetchPage(slug)
    }
  }
  
  fetchPage(slug) {
    this.props.pagesStore.fetchShow(slug).then((response) => {
      if (response.status == 200) {
        this.setState({
          htmlContent: response.data.html_content
        })
      }
    })
  }
  
  render() {
    return (
      <div className='article-container' dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
    )
  }
}