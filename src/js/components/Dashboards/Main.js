import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('dashboardsStore')
@observer
export default class Main extends React.Component {
  
  componentDidMount() {
    this.props.dashboardsStore.fetchMain()
  }
  
  renderArticlesStatistics(data) {
    if (data && data.articles) {
      return (
        <div>
          <h3>Articles</h3>
          <p>Total: { data.articles.total }</p>
          <p>Published: { data.articles.published }</p>
          <p>Hidden: { data.articles.hidden }</p>
          <p>Drafts: { data.articles.drafts }</p>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
  
  render() {
    return (
      <div>
        <h2 className='center'>Dashboard</h2>
        { this.renderArticlesStatistics(this.props.dashboardsStore.main) }
      </div>
    )
  }
}