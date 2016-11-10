import { connect } from 'react-redux'

import Articles from '../../components/Articles'

import {
  fetchArticles, fetchArticlesSuccess, fetchArticlesFailure,
  deleteArticle, deleteArticleSuccess, deleteArticleFailure
} from '../actions/articles'

function mapStateToProps(state, ownProps) {
  return {
    articlesList: state.articles.articlesList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    fetchArticles: fetchArticlesAndHandleResponse,
    deleteArticle: deleteArticleAndHandleResponse
  }
}

function fetchArticlesAndHandleResponse(dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(fetchArticles()).then((response) => {
      if (response.payload.status != 200) {
        dispatch(fetchArticlesFailure(response.payload))
      } else {
        dispatch(fetchArticlesSuccess(response.payload))
      }
    })
  })
}

function deleteArticleAndHandleResponse(dispatch, articleID) {
  return new Promise((resolve, reject) => {
    dispatch(deleteArticle(articleID)).then((response) => {
      if (response.payload.status != 200) {
        dispatch(deleteArticleFailure(response.payload))
      } else {
        dispatch(deleteArticleSuccess(response.payload))
        // ==== Reload list of Articles ====
        new Promise((resolve, reject) => {
          dispatch(fetchArticles()).then((response) => {
            if (response.payload.status != 200) {
              dispatch(fetchArticlesFailure(response.payload))
            } else {
              dispatch(fetchArticlesSuccess(response.payload))
            }
          })
        })      }
        // ==== Reload list of Articles ====
    })
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)