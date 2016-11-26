import { observable, action } from 'mobx'
import axios from 'axios'

import { API_URL } from '../constants'

export default class ArticlesStore {
  @observable articles = []
  @observable article = {}
  
  @action loadArticles() {
    let request = axios({
      method: 'GET',
      url: `${API_URL}/articles`,
      headers: []
    })
    request.then((response) => {
      if (response.status == 200) {
        this.articles = response.data
      }
    })
  }
  
  @action fetchArticle(articleID) {
    let request = axios({
      method: 'GET',
      url: `${API_URL}/articles/${articleID}`,
      headers: []
    })
    return request
  }
  
  @action createArticle(articleParams) {
    const request = axios({
      method: 'POST',
      data: articleParams,
      url: `${API_URL}/articles`
    })
    
    return request
  }
  
  @action updateArticle(articleParams, id) {
    const request = axios({
      method: 'PUT',
      data: articleParams,
      url: `${API_URL}/articles/${id}`
    })
    
    return request
  }
  
  @action deleteArticle(id) {
    let request = axios({
      method: 'DELETE',
      url: `${API_URL}/articles/${id}`
    })
    request.then(() => {
      this.loadArticles()
    })
  }
}