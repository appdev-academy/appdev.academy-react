import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class PagesStore {
  allowedPages = ['about', 'contacts', 'home']
  sessionsStore;
  @observable pages = []
  @observable page = {}
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex() {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/pages`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.pages = response.data
      }
    })
  }
  
  @action fetchShow(slug) {
    this.page = {}
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'GET',
      url: `${API_URL}/pages/${slug}`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.page = response.data
      }
    })
  }
  
  @action update(slug, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'PUT',
      url: `${API_URL}/pages/${slug}`,
      data: params,
      headers: headers
    })
    return request
  }
}