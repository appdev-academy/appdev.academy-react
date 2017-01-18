import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Pages {
  allowedPages = ['about', 'contacts', 'guides', 'home', 'open-source', 'portfolio', 'screencasts']
  sessionsStore;
  @observable pages = []
  
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
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'GET',
      url: `${API_URL}/pages/${slug}`,
      data: null,
      headers: headers
    })
    return request
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
