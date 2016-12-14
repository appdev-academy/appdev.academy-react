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
    this.article = {}
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
  
  @action publish(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/articles/${id}/publish`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
  
  @action hide(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/articles/${id}/hide`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
  
  @action sort(articleIDs) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/articles/sort`,
      data: { article_ids: articleIDs },
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
}