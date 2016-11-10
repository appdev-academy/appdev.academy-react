import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import Article from '../../components/Article'

import {
  fetchArticle, fetchArticleSuccess, fetchArticleFailure, resetActiveArticle, resetDeletedArticle
} from '../actions/articles'

function mapStateToProps(state, ownProps) {
  return {
    activeArticle: state.articles.activeArticle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    fetchArticle: fetchArticleAndHandleResponse
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

export default connect(mapStateToProps, mapDispatchToProps)(Article)