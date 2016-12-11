import React from 'react'
import { browserHistory } from 'react-router'
import { inject, observer } from 'mobx-react'

import Form from './Form'

@inject('pagesStore')
@observer
export default class Edit extends React.Component {
  
  componentDidMount() {
    console.log('componentDidMount');
    // Make sure Page is among allowed ones
    let slug = this.props.params.slug
    if (!this.props.pagesStore.allowedPages.includes(slug)) {
      browserHistory.push('/admin/pages')
    }
    // Fetch Page to edit
    this.props.pagesStore.fetchShow(slug)
    let page = this.props.pagesStore.page
    console.log('Page: ', JSON.stringify(page));
    
    setTimeout(() => {
      let page = this.props.pagesStore.page
      console.log('Page: ', JSON.stringify(page));
    },1000)
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    let slug = this.props.params.slug
    let page = nextProps.pagesStore.page
    if (!page || page == {}) { return }
    
    this.refs.pageForm.setPage(pageToEdit)
  }
  
  handleSubmit(params) {
    // let articleID = this.props.params.articleID
    // this.props.articlesStore.update(articleID, params).then((response) => {
    //   if (response.status == 200) {
    //     browserHistory.push('/admin/articles')
    //   }
    // })
  }
  
  render() {
    return (
      <div>
        <h2>{ this.props.pagesStore.page.slug }</h2>
        <Form handleSubmit={ this.handleSubmit.bind(this) } ref='pageForm' />
      </div>
    )
  }
}