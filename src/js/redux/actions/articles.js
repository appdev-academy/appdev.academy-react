import axios from 'axios'

const API_URL = 'https://serene-ocean-15499.herokuapp.com/api/v1'

// Show list of Articles
export const FETCH_ARTICLES = 'FETCH_ARTICLES'
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS'
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE'
export const RESET_ARTICLES = 'RESET_ARTICLES'

export function fetchArticles() {
  let request = axios({
    method: 'get',
    url: `${API_URL}/articles`,
    headers: []
  })

  return {
    type: FETCH_ARTICLES,
    payload: request
  }
}

export function fetchArticlesSuccess(articles) {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    payload: articles
  }
}

export function fetchArticlesFailure(error) {
  return {
    type: FETCH_ARTICLES_FAILURE,
    payload: error
  }
}

export function resetArticles() {
  return {
    type: RESET_ARTICLES
  }
}

// Delete article
export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS'
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE'
export const RESET_DELETED_ARTICLE = 'RESET_DELETED_ARTICLE'

export function deleteArticle(articleID) {
  let request = axios({
    method: 'delete',
    url: `${API_URL}/articles/${articleID}`
  })

  return {
    type: DELETE_ARTICLE,
    payload: request
  }
}

export function deleteArticleSuccess(deletedArticle) {
  return {
    type: DELETE_ARTICLE_SUCCESS,
    payload: deletedArticle
  }
}

export function deleteArticleFailure(error) {
  return {
    type: DELETE_ARTICLE_FAILURE,
    payload: error
  }
}

export function resetDeletedArticle() {
  return {
    type: RESET_DELETED_ARTICLE
  }
}

// Show Article
export const FETCH_ARTICLE = 'FETCH_ARTICLE'
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS'
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE'
export const RESET_ACTIVE_ARTICLE = 'RESET_ACTIVE_ARTICLE'

export function fetchArticle(articleID) {
  let request = axios({
    method: 'get',
    url: `${API_URL}/articles/${articleID}`,
    headers: []
  })

  return {
    type: FETCH_ARTICLE,
    payload: request
  }
}

export function fetchArticleSuccess(activeArticle) {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    payload: activeArticle
  }
}

export function fetchArticleFailure(error) {
  return {
    type: FETCH_ARTICLE_FAILURE,
    payload: error
  }
}

export function resetActiveArticle() {
  return {
    type: RESET_ACTIVE_ARTICLE
  }
}