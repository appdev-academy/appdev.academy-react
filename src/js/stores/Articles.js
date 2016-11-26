import { observable, action } from 'mobx'
import axios from 'axios'

import { API_URL } from '../constants'

export default class ArticlesStore {
  @observable articles = []
  @observable article = {}
  
  @action fetchIndex() {
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
  
  @action fetchShow(id) {
    let request = axios({
      method: 'GET',
      url: `${API_URL}/articles/${id}`,
      headers: []
    })
    return request
  }
  
  @action create(params) {
    const request = axios({
      method: 'POST',
      data: params,
      url: `${API_URL}/articles`
    })
    
    return request
  }
  
  @action update(id, params) {
    const request = axios({
      method: 'PUT',
      data: params,
      url: `${API_URL}/articles/${id}`
    })
    
    return request
  }
  
  @action delete(id) {
    let request = axios({
      method: 'DELETE',
      url: `${API_URL}/articles/${id}`
    })
    request.then((response) => {
      this.fetchIndex()
    })
  }
}