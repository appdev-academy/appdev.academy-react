import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Screencasts {
  sessionsStore;
  @observable screencasts = []
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex(topicID) {
    this.screencasts = []
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/topics/${topicID}/screencasts`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.screencasts = response.data
      }
    })
  }
  
  @action fetchShow(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'GET',
      url: `${API_URL}/screencasts/${id}`,
      data: null,
      headers: headers
    })
    return request
  }
  
  @action create(topicID, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'POST',
      url: `${API_URL}/topics/${topicID}/screencasts`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action update(id, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'PUT',
      url: `${API_URL}/screencasts/${id}`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action delete(topicID, id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'DELETE',
      url: `${API_URL}/screencasts/${id}`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex(topicID)
    })
  }
  
  @action publish(topicID, id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/screencasts/${id}/publish`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex(topicID)
    })
  }
  
  @action hide(topicID, id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/screencasts/${id}/hide`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex(topicID)
    })
  }
  
  @action sort(topicID, screencastsIDs) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/topics/${topicID}/screencasts/sort`,
      data: { screencast_ids: screencastsIDs },
      headers: headers
    }).then((response) => {
      this.fetchIndex(topicID)
    })
  }
}
