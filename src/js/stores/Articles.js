import { observable, action } from 'mobx';
import axios from 'axios'

const API_URL = 'http://new.appdev.academy/api/react'

export default class ArticlesStore {
  @observable articles = []
  @observable article = {}
  
  @action loadArticles() {
    let request = axios({
      method: 'get',
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
      method: 'get',
      url: `${API_URL}/articles/${articleID}`,
      headers: []
    })
    return request
  }
  
  @action deleteArticle(articleID) {
    let request = axios({
      method: 'delete',
      url: `${API_URL}/articles/${articleID}`
    })
    request.then(() => {
      this.loadArticles()
    })
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
}