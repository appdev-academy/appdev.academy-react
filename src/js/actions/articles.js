import axios from 'axios'

const API_URL = 'https://serene-ocean-15499.herokuapp.com/api/v1'

export function fetchArticles() {
  let request = axios({
    method: 'get',
    url: `${API_URL}/articles`,
    headers: []
  })

  return request
}

export function fetchArticle(articleID) {
  let request = axios({
    method: 'get',
    url: `${API_URL}/articles/${articleID}`,
    headers: []
  })

  return request
}

export function deleteArticle(articleID) {
  let request = axios({
    method: 'delete',
    url: `${API_URL}/articles/${articleID}`
  })

  return request
}