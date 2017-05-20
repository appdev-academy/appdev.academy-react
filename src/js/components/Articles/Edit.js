import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('articlesStore')
@inject('tagsStore')
@observer
export default class Edit extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  
  componentDidMount() {
    let articleID = this.props.params.articleID
    let articleForm = this.refs.articleForm
    this.props.articlesStore.fetchShow(articleID).then((response) => {
      if (response.status == 200) {
        articleForm.setArticle(response.data)
      }
    })
  }
  
  handleSubmit(params) {
    let articleID = this.props.params.articleID
    this.props.articlesStore.update(articleID, params).then((response) => {
      if (response.status == 200) {
        browserHistory.push('/articles')
      }
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        this.setState({
          errors: error.response.data.errors
        })
      }
    })
  }
  
  render() {
    return (
      <Form
        tagsStore={ this.props.tagsStore }
        allTags={ this.props.tagsStore.tags }
        errors={ this.state.errors }
        handleSubmit={ this.handleSubmit.bind(this) }
        ref='articleForm'
      />
    )
  }
}
