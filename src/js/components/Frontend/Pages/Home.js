import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('pagesStore')
@observer
export default class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      htmlContent: ''
    }
  }
  
  componentDidMount() {
    this.props.pagesStore.fetchShow('home').then((response) => {
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