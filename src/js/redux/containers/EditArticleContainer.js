import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import EditArticle from '../../components/EditArticle'

import {
  fetchArticle, fetchArticleSuccess, fetchArticleFailure, resetActiveArticle,
  updateArticle, updateArticleSuccess, updateArticleFailure, resetUpdatedArticle
} from '../actions/articles'

function mapStateToProps(state, ownProps) {
  return {
    activeArticle: state.articles.activeArticle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    fetchArticle: fetchArticleAndHandleResponse,
    updateArticle: updateArticleAndHandleResponse
  }
}

function fetchArticleAndHandleResponse(dispatch, articleID) {
  return new Promise((resolve, reject) => {
    dispatch(fetchArticle(articleID)).then((response) => {
      if (response.payload.response && response.payload.response.status == 404) {
        browserHistory.push('/not-found')
      } else if (response.payload.status != 200) {
        dispatch(fetchArticleFailure(response.payload))
      } else {
        dispatch(fetchArticleSuccess(response.payload))
      }
    })
  })
}

function updateArticleAndHandleResponse(dispatch, articleParams, id) {
  return new Promise((resolve, reject) => {
    dispatch(updateArticle(articleParams, id)).then((response) => {
      if (response.payload.response && response.payload.response.status == 409) {
        browserHistory.push('/not-found')
      } else if (response.payload.status != 200) {
        dispatch(updateArticleFailure(response.payload))
      } else {
        dispatch(updateArticleSuccess(response.payload))
        browserHistory.push('/admin/articles')
      }
    })
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)