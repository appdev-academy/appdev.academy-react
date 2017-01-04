import React from 'react'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Projects from './Projects'

@inject('pagesStore')
@observer
export default class Portfolio extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      htmlContent: ''
    }
  }
  
  componentDidMount() {
    this.props.pagesStore.fetchShow('portfolio').then((response) => {
      if (response.status == 200) {
        this.setState({
          htmlContent: response.data.html_content
        })
      }
    })
  }
  
  render() {
    return (
      <div>
        <Helmet title='App Dev Academy | Portfolio' />
        <div className='article-container' dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
        <Projects />
      </div>
    )
  }
}