import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Images {
  sessionsStore;
  @observable images = [];
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex() {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/images`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.images = response.data
      }
    })
  }
  
  @action create(params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'POST',
      url: `${API_URL}/images`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action delete(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'DELETE',
      url: `${API_URL}/images/${id}`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
}
