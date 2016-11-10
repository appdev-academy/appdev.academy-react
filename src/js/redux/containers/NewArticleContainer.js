import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import NewArticle from '../../components/NewArticle'

import {
  createArticle, createArticleSuccess, createArticleFailure, resetNewArticle
} from '../actions/articles'

function mapStateToProps(state, ownProps) {
  return {
    newArticle: state.articles.newArticle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    createArticle: createArticleAndHandleResponse
  }
}

function createArticleAndHandleResponse(dispatch, articleParams) {
  return new Promise((resolve, reject) => {
    dispatch(createArticle(articleParams)).then((response) => {
      if (response.payload.response && response.payload.response.status == 409) {
        browserHistory.push('/not-found')
      } else if (response.payload.status != 200) {
        dispatch(createArticleFailure(response.payload))
      } else {
        dispatch(createArticleSuccess(response.payload))
        browserHistory.push('/admin/articles')
      }
    })
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)