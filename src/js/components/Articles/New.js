import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('articlesStore')
@inject('tagsStore')
@observer
export default class New extends React.Component {
  
  handleSubmit(articleParams) {
    this.props.articlesStore.create(articleParams).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/articles')
      }
    })
  }
  
  render() {
    return (
      <Form
        allTags={ this.props.tagsStore.tags }
        tagsStore={ this.props.tagsStore }
        handleSubmit={ this.handleSubmit.bind(this) }
        ref='articleForm'
      />
    )
  }
}
