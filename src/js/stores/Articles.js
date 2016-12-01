import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class ArticlesStore {
  sessionsStore;
  @observable articles = []
  @observable article = {}
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex() {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/articles`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.articles = response.data
      }
    })
  }
  
  @action fetchShow(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'GET',
      url: `${API_URL}/articles/${id}`,
      data: null,
      headers: headers
    })
    return request
  }
  
  @action create(params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'POST',
      url: `${API_URL}/articles`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action update(id, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'PUT',
      url: `${API_URL}/articles/${id}`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action delete(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'DELETE',
      url: `${API_URL}/articles/${id}`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
}